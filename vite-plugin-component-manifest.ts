import {
  PluginOption,
  normalizePath,
  ResolvedConfig,
  ViteDevServer,
} from 'vite';
import fs from 'fs';
import path from 'path';

const VIRTUAL_MODULE_ID = 'virtual:component-manifest';
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;

export default function componentManifest(): PluginOption {
  let componentsDir: string;
  let config: ResolvedConfig;
  let isWatchMode = false;
  let serverInstance: ViteDevServer | null = null; // To hold ViteDevServer instance

  function generateDevManifestContent(): string {
    try {
      const componentFiles = fs.readdirSync(componentsDir).filter((name) => {
        const componentPath = path.join(componentsDir, name);
        return (
          fs.statSync(componentPath).isDirectory() &&
          fs.existsSync(path.join(componentPath, `${name}.ts`))
        );
      });

      const importEntries = componentFiles.map(
        (name) =>
          `  '${name}': () =>
    import('/${normalizePath(path.relative(config.root, path.join(componentsDir, name, `${name}.ts`)))}')`
      );
      // Note: Using absolute paths from root for imports in dev, e.g., /src/components/name/name.ts
      // This is more robust for Vite's module resolution.

      return `// Auto-generated file - DO NOT EDIT (dev mode / build --watch)
export const COMPONENT_PATHS = {
${importEntries.join(',\n')}${importEntries.length > 0 ? ',' : ''}
};`;
    } catch (error) {
      console.error('Error generating component manifest for dev:', error);
      return `export const COMPONENT_PATHS = {}; // Error generating manifest`;
    }
  }

  return {
    name: 'vite-plugin-component-manifest',
    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        if (config.command === 'serve' || isWatchMode) {
          return generateDevManifestContent();
        } else {
          // Production build
          return `// Auto-generated file - Placeholder
export const COMPONENT_PATHS = "__COMPONENT_PATHS_PLACEHOLDER__";`;
        }
      }
    },
    config(userConfig, { command }) {
      // Dynamically add components as Rollup inputs for build
      if (command === 'build') {
        const currentComponentsDir = normalizePath(
          path.resolve(userConfig.root || process.cwd(), 'src/components')
        );
        const componentEntries: { [key: string]: string } = {};
        try {
          if (fs.existsSync(currentComponentsDir)) {
            const componentNames = fs
              .readdirSync(currentComponentsDir)
              .filter((name) => {
                const componentPath = path.join(currentComponentsDir, name);
                return (
                  fs.statSync(componentPath).isDirectory() &&
                  fs.existsSync(path.join(componentPath, `${name}.ts`))
                );
              });
            for (const name of componentNames) {
              // Key for rollup input needs to be simple, value is the path
              componentEntries[`component_${name}`] = normalizePath(
                path.resolve(currentComponentsDir, name, `${name}.ts`)
              );
            }
          }
        } catch (error) {
          console.error(
            'vite-plugin-component-manifest: Error scanning components for rollup input:',
            error
          );
        }

        if (Object.keys(componentEntries).length > 0) {
          userConfig.build = userConfig.build || {};
          userConfig.build.rollupOptions = userConfig.build.rollupOptions || {};
          userConfig.build.rollupOptions.input = {
            ...(userConfig.build.rollupOptions.input as object), // Keep existing inputs if any
            ...componentEntries,
            // Ensure main entry point is still present if not explicitly defined by user
            main: normalizePath(
              path.resolve(userConfig.root || process.cwd(), 'index.html')
            ),
          };
          console.log(
            'vite-plugin-component-manifest: Added component entries to rollupOptions.input:',
            userConfig.build.rollupOptions.input
          );
        }
      }
    },
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      componentsDir = normalizePath(
        path.resolve(config.root, 'src/components')
      );
      if (config.build.watch && config.command === 'build') {
        isWatchMode = true; // Specifically for `vite build --watch`
      }
      // `config.command === 'serve'` is handled directly in load hook
    },
    // buildStart hook that initialized src/components.ts is removed.
    configureServer(server) {
      serverInstance = server; // Store server instance
      componentsDir = normalizePath(
        path.resolve(config.root, 'src/components') // Ensure componentsDir is set for server
      );

      fs.watch(componentsDir, { recursive: true }, (eventType, filename) => {
        if (filename) {
          console.log(
            `vite-plugin-component-manifest: Detected change in ${componentsDir}/${filename}, invalidating ${VIRTUAL_MODULE_ID}`
          );
          const mod = serverInstance.moduleGraph.getModuleById(
            RESOLVED_VIRTUAL_MODULE_ID
          );
          if (mod) {
            serverInstance.moduleGraph.invalidateModule(mod);
            // Trigger HMR for modules that import the virtual module
            serverInstance.ws.send({
              type: 'update',
              updates: [
                {
                  type: 'js-update',
                  path: mod.id || RESOLVED_VIRTUAL_MODULE_ID, // Fallback, should have id
                  acceptedPath: mod.id || RESOLVED_VIRTUAL_MODULE_ID,
                  timestamp: Date.now(),
                },
              ],
            });
          }
        }
      });
    },
    generateBundle(options, bundle) {
      if (config.command === 'build' && !isWatchMode) {
        // Only for production `vite build` (not --watch)
        const imports: string[] = [];
        const componentInputMatcher = /src\/components\/([^/]+)\/\1\.ts$/;

        // console.log('--- Component Manifest Plugin: generateBundle ---');
        // console.log('Bundle object keys:', Object.keys(bundle));

        for (const chunkInfo of Object.values(bundle)) {
          if (chunkInfo.type === 'chunk') {
            // facadeModuleId is the original entry point for this chunk
            const facadeId = chunkInfo.facadeModuleId;
            if (
              facadeId &&
              componentInputMatcher.test(normalizePath(facadeId))
            ) {
              const match = normalizePath(facadeId).match(
                componentInputMatcher
              );
              if (match && match[1]) {
                const componentName = match[1];
                // Ensure base path is handled correctly for dynamic imports.
                // Vite handles relative paths for dynamic imports well.
                // The import path should be relative to the deployed index.html,
                // or an absolute path from the domain root if base is '/'.
                let importPath = normalizePath(
                  path.posix.join(config.base, chunkInfo.fileName)
                );
                if (!importPath.startsWith('/')) {
                  importPath = '/' + importPath; // Ensure it's an absolute path from root for dynamic import
                }

                imports.push(
                  `  '${componentName}': () =>
    import('${importPath}')`
                );
                // console.log(`    -> Found component: ${componentName}, Path: ${importPath}`);
              }
            }
            // The fallback logic for chunkInfo.isEntry and scanning chunkInfo.modules
            // might be less reliable with explicit component inputs.
            // FacadeModuleId should be the primary way to identify component chunks.
          }
        }
        // console.log('--- End Component Manifest Plugin ---');

        if (imports.length === 0) {
          console.warn(
            'vite-plugin-component-manifest: No component entry points found in the bundle. Placeholder will be empty.'
          );
        }

        const objectString = `{
${imports.join(',\n')}${imports.length > 0 ? ',' : ''}
}`;

        for (const chunk of Object.values(bundle)) {
          if (chunk.type === 'chunk' && chunk.code) {
            // Ensure the placeholder is replaced correctly as a string literal in the code
            const placeholderRegex = /"__COMPONENT_PATHS_PLACEHOLDER__"/g;
            if (placeholderRegex.test(chunk.code)) {
              chunk.code = chunk.code.replace(placeholderRegex, objectString);
              // console.log(`Replaced placeholder in chunk: ${chunk.fileName}`);
            }
          }
        }
      }
      // The case for `isWatchMode && config.command === 'build'` (i.e. `vite build --watch`)
      // is now handled by the `load` hook returning dev paths, so no specific logic needed here.
    },
  };
}
