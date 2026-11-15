// The project's own CLI: scaffolds code that follows the app's conventions and
// describes the project to tools. No dependencies; Node runs it as-is.
//
//   npm run boba -- generate component <tag-name>
//   npm run boba -- generate service <name>
//   npm run boba -- add route <path> <tag-name>
//   npm run boba -- manifest     Print the project's components, services and routes as JSON
//   npm run boba -- mcp          Serve the commands above to AI assistants (Model Context Protocol, stdio)
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

const pascalCase = (name: string) =>
  name.replace(/(^|-)(\w)/g, (_, _dash, letter: string) =>
    letter.toUpperCase()
  );

function write(root: string, file: string, content: string): string {
  const target = path.join(root, file);
  if (fs.existsSync(target)) throw new Error(`${file} already exists`);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
  return file;
}

/** Creates `src/components/<name>/<name>.{ts,html,css}`. Returns the files. */
export function generateComponent(root: string, name: string): string[] {
  // Custom element names must be lowercase and contain a hyphen.
  if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)+$/.test(name)) {
    throw new Error(`"${name}" is not a valid tag name; use e.g. user-card`);
  }
  const dir = `src/components/${name}`;
  const className = `${pascalCase(name)}Component`;
  return [
    write(
      root,
      `${dir}/${name}.ts`,
      `import { BaseComponent } from '../../core/base-component.ts';
import template from './${name}.html?raw';
import style from './${name}.css?raw';

export class ${className} extends BaseComponent {
  static tagName = '${name}';

  constructor() {
    super(template, style);
  }

  init() {}
}

if (!customElements.get(${className}.tagName)) {
  customElements.define(${className}.tagName, ${className});
}
`
    ),
    write(root, `${dir}/${name}.html`, `<h1>${name}</h1>\n`),
    write(root, `${dir}/${name}.css`, `:host {\n  display: block;\n}\n`),
  ];
}

/** Creates `src/services/<name>.ts` and its unit test. Returns the files. */
export function generateService(root: string, name: string): string[] {
  if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(name)) {
    throw new Error(`"${name}" is not a valid name; use e.g. cart-service`);
  }
  const pascal = pascalCase(name);
  const fn = pascal[0].toLowerCase() + pascal.slice(1);
  return [
    write(
      root,
      `src/services/${name}.ts`,
      `// Keep services free of DOM access so they can be tested with \`node --test\`.
export function ${fn}(): string {
  return '${name}';
}
`
    ),
    write(
      root,
      `src/services/${name}.test.ts`,
      `import { test } from 'node:test';
import assert from 'node:assert';
import { ${fn} } from './${name}.ts';

test('${name}', () => {
  assert.strictEqual(${fn}(), '${name}');
});
`
    ),
  ];
}

const ROUTE =
  /router\.registerRoute\(\{\s*path:\s*'([^']+)',\s*component:\s*'([^']+)'[^}]*\}\);/g;

function readRoutes(root: string) {
  const main = fs.readFileSync(path.join(root, 'src/main.ts'), 'utf8');
  return { main, matches: [...main.matchAll(ROUTE)] };
}

/** Registers a route for an existing component in `src/main.ts`. */
export function addRoute(
  root: string,
  routePath: string,
  component: string
): string {
  if (!routePath.startsWith('/')) throw new Error('A route starts with "/"');
  if (!fs.existsSync(path.join(root, 'src/components', component))) {
    throw new Error(`No component "${component}" in src/components`);
  }
  const { main, matches } = readRoutes(root);
  if (matches.some((match) => match[1] === routePath)) {
    throw new Error(`Route ${routePath} is already registered`);
  }
  const last = matches.at(-1);
  if (!last) throw new Error('No router.registerRoute(…) call in src/main.ts');

  const end = last.index + last[0].length;
  const line = `\nrouter.registerRoute({ path: '${routePath}', component: '${component}' });`;
  fs.writeFileSync(
    path.join(root, 'src/main.ts'),
    main.slice(0, end) + line + main.slice(end)
  );
  return `${routePath} -> ${component}`;
}

/** Describes the project, read from the source so it can't go stale. */
export function manifest(root: string) {
  const list = (dir: string) =>
    fs.existsSync(path.join(root, dir))
      ? fs.readdirSync(path.join(root, dir))
      : [];
  const { name, version } = JSON.parse(
    fs.readFileSync(path.join(root, 'package.json'), 'utf8')
  );
  return {
    name,
    version,
    components: list('src/components').map((tag) => ({
      tag,
      path: `src/components/${tag}/${tag}.ts`,
    })),
    services: list('src/services')
      .filter((file) => file.endsWith('.ts') && !file.endsWith('.test.ts'))
      .map((file) => `src/services/${file}`),
    routes: readRoutes(root).matches.map(([, routePath, component]) => ({
      path: routePath,
      component,
    })),
  };
}

type Args = Record<string, string>;
const text = { type: 'string' };

/** The same operations, described for MCP clients. */
const tools = [
  {
    name: 'project_manifest',
    description: 'List the components, services and routes of this Boba app.',
    inputSchema: { type: 'object', properties: {} },
    run: (root: string) => JSON.stringify(manifest(root), null, 2),
  },
  {
    name: 'generate_component',
    description:
      'Scaffold a web component (.ts, .html, .css) in src/components.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { ...text, description: 'Tag name, e.g. user-card' },
      },
      required: ['name'],
    },
    run: (root: string, args: Args) =>
      generateComponent(root, args.name).join('\n'),
  },
  {
    name: 'generate_service',
    description: 'Scaffold a service and its unit test in src/services.',
    inputSchema: {
      type: 'object',
      properties: { name: { ...text, description: 'e.g. cart-service' } },
      required: ['name'],
    },
    run: (root: string, args: Args) =>
      generateService(root, args.name).join('\n'),
  },
  {
    name: 'add_route',
    description: 'Register a route for an existing component in src/main.ts.',
    inputSchema: {
      type: 'object',
      properties: {
        path: { ...text, description: 'e.g. /cart or /user/:id' },
        component: { ...text, description: 'Tag name of the component' },
      },
      required: ['path', 'component'],
    },
    run: (root: string, args: Args) =>
      addRoute(root, args.path, args.component),
  },
];

interface RpcRequest {
  id?: number | string;
  method: string;
  params?: {
    protocolVersion?: string;
    name?: string;
    arguments?: Args;
  };
}

/** Answers one MCP (JSON-RPC 2.0) request; `undefined` for notifications. */
export function handleMcp(root: string, request: RpcRequest) {
  const { id, method, params = {} } = request;
  if (id === undefined) return undefined;
  const reply = (result: object) => ({ jsonrpc: '2.0', id, result });

  switch (method) {
    case 'initialize':
      return reply({
        protocolVersion: params.protocolVersion ?? '2025-06-18',
        capabilities: { tools: {} },
        serverInfo: { name: 'boba', version: manifest(root).version },
      });
    case 'ping':
      return reply({});
    case 'tools/list':
      return reply({
        tools: tools.map(({ name, description, inputSchema }) => ({
          name,
          description,
          inputSchema,
        })),
      });
    case 'tools/call': {
      const result = (output: string, isError = false) =>
        reply({ content: [{ type: 'text', text: output }], isError });
      const tool = tools.find((candidate) => candidate.name === params.name);
      if (!tool) return result(`Unknown tool: ${params.name}`, true);
      try {
        return result(tool.run(root, params.arguments ?? {}));
      } catch (error) {
        return result((error as Error).message, true);
      }
    }
    default:
      return {
        jsonrpc: '2.0',
        id,
        error: { code: -32601, message: `Method not found: ${method}` },
      };
  }
}

async function serveMcp(root: string) {
  // The stdio transport: one JSON message per line, in and out.
  for await (const line of readline.createInterface({ input: process.stdin })) {
    if (!line.trim()) continue;
    const response = handleMcp(root, JSON.parse(line));
    if (response) process.stdout.write(JSON.stringify(response) + '\n');
  }
}

const USAGE = `Usage: npm run boba -- <command>

  generate component <tag-name>   Scaffold src/components/<tag-name>/
  generate service <name>         Scaffold src/services/<name>.ts and its test
  add route <path> <tag-name>     Register a route in src/main.ts
  manifest                        Print components, services and routes as JSON
  mcp                             Serve these commands over the Model Context Protocol`;

export async function main(root: string, args: string[]): Promise<void> {
  const [command, kind, ...rest] = args;
  const done = (files: string[]) =>
    console.log(`Created\n  ${files.join('\n  ')}`);

  if (command === 'generate' && kind === 'component' && rest[0]) {
    done(generateComponent(root, rest[0]));
  } else if (command === 'generate' && kind === 'service' && rest[0]) {
    done(generateService(root, rest[0]));
  } else if (command === 'add' && kind === 'route' && rest[1]) {
    console.log(`Added route ${addRoute(root, rest[0], rest[1])}`);
  } else if (command === 'manifest') {
    console.log(JSON.stringify(manifest(root), null, 2));
  } else if (command === 'mcp') {
    await serveMcp(root);
  } else {
    console.log(USAGE);
    if (command) process.exitCode = 1;
  }
}

if (import.meta.main) {
  main(process.cwd(), process.argv.slice(2)).catch((error: Error) => {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  });
}
