import { PluginOption, normalizePath, ResolvedConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default function componentManifest(): PluginOption {
  let componentsDir: string;
  let config: ResolvedConfig;
  let isWatchMode = false;

  return {
    name: 'vite-plugin-component-manifest',
    config(userConfig, { command }) {
      // Dynamically add components as Rollup inputs for build
      if (command === 'build') {
        const currentComponentsDir = normalizePath(path.resolve(userConfig.root || process.cwd(), 'src/components'));
        const componentEntries: { [key: string]: string } = {};
        try {
          if (fs.existsSync(currentComponentsDir)) {
            const componentNames = fs.readdirSync(currentComponentsDir).filter((name) => {
              const componentPath = path.join(currentComponentsDir, name);
              return fs.statSync(componentPath).isDirectory() &&
                     fs.existsSync(path.join(componentPath, `${name}.ts`));
            });
            for (const name of componentNames) {
              // Key for rollup input needs to be simple, value is the path
              componentEntries[`component_${name}`] = normalizePath(path.resolve(currentComponentsDir, name, `${name}.ts`));
            }
          }
        } catch (error) {
          console.error("vite-plugin-component-manifest: Error scanning components for rollup input:", error);
        }

        if (Object.keys(componentEntries).length > 0) {
          userConfig.build = userConfig.build || {};
          userConfig.build.rollupOptions = userConfig.build.rollupOptions || {};
          userConfig.build.rollupOptions.input = {
            ...(userConfig.build.rollupOptions.input as object), // Keep existing inputs if any
            ...componentEntries,
            // Ensure main entry point is still present if not explicitly defined by user
            main: normalizePath(path.resolve(userConfig.root || process.cwd(), 'index.html'))
          };
           console.log("vite-plugin-component-manifest: Added component entries to rollupOptions.input:", userConfig.build.rollupOptions.input);
        }
      }
    },
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      componentsDir = normalizePath(
        path.resolve(config.root, 'src/components')
      );
      if (config.command === 'serve' || (config.build.watch && config.command === 'build')) {
        isWatchMode = true;
      }
    },
    buildStart() {
      // For production builds (not watch), ensure components.ts is clean initially
      // This hook runs AFTER the config hook where inputs are set.
      if (config.command === 'build' && !isWatchMode) { // isWatchMode check is more robust
        const initialContent = `// Auto-generated file - DO NOT EDIT (build start)
// This file is overwritten by generateBundle with actual production paths.
export const COMPONENT_PATHS = {};
`;
        try {
          // Ensure config object is available. It should be by buildStart.
          if (!config || !config.root) {
            console.error("vite-plugin-component-manifest: Config not available in buildStart. Skipping initialization of components.ts.");
            return;
          }
          fs.writeFileSync(
            path.resolve(config.root, 'src/components.ts'),
            initialContent
          );
          // console.log("vite-plugin-component-manifest: Initialized src/components.ts for production build.");
        } catch (error) {
          console.error("vite-plugin-component-manifest: Error initializing src/components.ts:", error);
        }
      }
    },
    configureServer() {
      // This hook is only for the dev server and build --watch
      const generateManifestForDev = () => {
        try {
          const components = fs.readdirSync(componentsDir).filter((name) => {
            const componentPath = path.join(componentsDir, name);
            // Check if it's a directory and contains a .ts file with the same name
            return fs.statSync(componentPath).isDirectory() &&
                   fs.existsSync(path.join(componentPath, `${name}.ts`));
          });

          const imports = components
            .map((name) => {
              // For dev, paths are relative from src/ to src/components/name/name.ts
              const importPath = `./components/${name}/${name}.ts`;
              return `  "${name}": () => import("${importPath}")`;
            })
            .join(',\n');

          const content = `// Auto-generated file - DO NOT EDIT (dev mode)
export const COMPONENT_PATHS = {
${imports}
};
`;
          fs.writeFileSync(
            path.resolve(config.root, 'src/components.ts'),
            content
          );
        } catch (error) {
          console.error('Error generating component manifest for dev:', error);
        }
      };

      generateManifestForDev();
      fs.watch(componentsDir, { recursive: true }, (eventType, filename) => {
        if (filename) {
          console.log(`Detected change in ${filename}, regenerating component manifest...`);
          generateManifestForDev();
        }
      });
    },
    generateBundle(options, bundle) {
      // This hook is for production builds
      if (isWatchMode && config.command === 'build') {
        // If it's `vite build --watch`, we still want dev-like paths for HMR
        // The configureServer logic should handle this by continuously writing dev paths.
        // However, to be safe, if generateBundle is called in watch mode,
        // we ensure dev paths are written, as final asset paths might not be stable.
        try {
            const components = fs.readdirSync(componentsDir).filter((name) => {
                const componentPath = path.join(componentsDir, name);
                return fs.statSync(componentPath).isDirectory() &&
                       fs.existsSync(path.join(componentPath, `${name}.ts`));
            });

            const imports = components
                .map((name) => `  "${name}": () => import("./components/${name}/${name}.ts")`)
                .join(',\n');

            const content = `// Auto-generated file - DO NOT EDIT (build --watch)
export const COMPONENT_PATHS = {
${imports}
};
`;
            fs.writeFileSync(
                path.resolve(config.root, 'src/components.ts'),
                content
            );
        } catch (error) {
            console.error('Error generating component manifest for build --watch:', error);
        }
        return;
      }


      // Proceed with production path generation only if not in watch mode build
      if (config.command === 'build' && !config.build.watch) {
        const imports: string[] = [];
        const componentInputMatcher = /src\/components\/([^\/]+)\/\1\.ts$/;

        console.log("--- Component Manifest Plugin: generateBundle ---");
        console.log("Bundle object:", JSON.stringify(Object.keys(bundle), null, 2));

        for (const [fileName, chunkInfo] of Object.entries(bundle)) {
          if (chunkInfo.type === 'chunk') {
            console.log(`\nProcessing chunk: ${fileName}`);
            console.log(`  Is Entry: ${chunkInfo.isEntry}`);
            console.log(`  Facade Module ID: ${chunkInfo.facadeModuleId ? normalizePath(chunkInfo.facadeModuleId) : 'N/A'}`);
            console.log(`  Chunk Name: ${chunkInfo.name}`);
            console.log(`  Chunk File Name: ${chunkInfo.fileName}`);
            console.log(`  Chunk Imports: ${JSON.stringify(chunkInfo.imports)}`);
            console.log(`  Chunk Dynamic Imports: ${JSON.stringify(chunkInfo.dynamicImports)}`);
            console.log(`  Modules in chunk: ${Object.keys(chunkInfo.modules).map(m => normalizePath(m)).join(', ')}`)


            // facadeModuleId is the original entry point for this chunk
            const facadeId = chunkInfo.facadeModuleId;
            if (facadeId && componentInputMatcher.test(normalizePath(facadeId))) {
              const match = normalizePath(facadeId).match(componentInputMatcher);
              if (match && match[1]) {
                const componentName = match[1];
                const importPath = path.posix.join(config.base, chunkInfo.fileName);
                imports.push(`  "${componentName}": () => import("${importPath}")`);
                console.log(`    -> Found component: ${componentName}, Path: ${importPath}`);
              }
            } else if (chunkInfo.isEntry) {
                // If it's an entry chunk but didn't match the facadeId pattern,
                // let's try to find if any of its modules match our component structure.
                // This is a fallback, as ideally facadeModuleId should work for entries.
                for (const moduleId of Object.keys(chunkInfo.modules)) {
                    const normalizedModuleId = normalizePath(moduleId);
                    if(componentInputMatcher.test(normalizedModuleId)) {
                        const match = normalizedModuleId.match(componentInputMatcher);
                        if (match && match[1]) {
                            const componentName = match[1];
                            // Check if this component name was already added via facadeModuleId
                            if (!imports.some(imp => imp.includes(`"${componentName}"`))) {
                                const importPath = path.posix.join(config.base, chunkInfo.fileName);
                                imports.push(`  "${componentName}": () => import("${importPath}")`);
                                console.log(`    -> Found component (via modules scan): ${componentName}, Path: ${importPath}`);
                            }
                            break; // Found component for this chunk
                        }
                    }
                }
            }
          }
        }
        console.log("--- End Component Manifest Plugin ---");

        if (imports.length === 0) {
            console.warn("vite-plugin-component-manifest: No component entry points found in the bundle. components.ts will be empty.");
        }

        const content = `// Auto-generated file - DO NOT EDIT (production build)
export const COMPONENT_PATHS = {
${imports.join(',\n')}
};
`;
        // Output to src/components.ts, which is then processed by the build
        // This ensures it's part of the final application bundle correctly.
        // It might be better to emit this as a virtual module or directly into dist,
        // but for now, this matches the existing behavior of writing to src/.
        fs.writeFileSync(
          path.resolve(config.root, 'src/components.ts'),
          content
        );
      }
    },
  };
}
