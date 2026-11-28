import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  addRoute,
  generateComponent,
  generateService,
  handleMcp,
  manifest,
} from './boba.ts';

const MAIN = `const router = Router.getInstance();
router.registerRoute({ path: '/', component: 'home-page' });
router.start();
`;

describe('boba CLI', () => {
  let root: string;
  const read = (file: string) => fs.readFileSync(path.join(root, file), 'utf8');

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'boba-'));
    fs.mkdirSync(path.join(root, 'src/components/home-page'), {
      recursive: true,
    });
    fs.writeFileSync(path.join(root, 'src/main.ts'), MAIN);
    fs.writeFileSync(
      path.join(root, 'package.json'),
      '{"name":"demo","version":"2.3.4"}'
    );
  });

  afterEach(() => fs.rmSync(root, { recursive: true, force: true }));

  test('generate component scaffolds the three files', () => {
    const files = generateComponent(root, 'user-card');
    assert.deepStrictEqual(files, [
      'src/components/user-card/user-card.ts',
      'src/components/user-card/user-card.html',
      'src/components/user-card/user-card.css',
    ]);
    assert.match(read(files[0]), /class UserCardComponent extends Base/);
    assert.match(read(files[0]), /static tagName = 'user-card'/);
  });

  test('generate component rejects invalid tag names and overwrites', () => {
    assert.throws(() => generateComponent(root, 'card'), /valid tag name/);
    generateComponent(root, 'user-card');
    assert.throws(() => generateComponent(root, 'user-card'), /already exists/);
  });

  test('generate service scaffolds a service whose test passes', () => {
    generateService(root, 'cart-service');
    assert.match(read('src/services/cart-service.ts'), /function cartService/);
    const run = spawnSync(process.execPath, [
      '--test',
      path.join(root, 'src/services/cart-service.test.ts'),
    ]);
    assert.strictEqual(run.status, 0, String(run.stdout));
  });

  test('add route registers after the last route', () => {
    generateComponent(root, 'user-card');
    addRoute(root, '/card/:id', 'user-card');
    assert.strictEqual(
      read('src/main.ts'),
      MAIN.replace(
        'router.start',
        "router.registerRoute({ path: '/card/:id', component: 'user-card' });\nrouter.start"
      )
    );
    assert.throws(() => addRoute(root, '/card/:id', 'user-card'), /already/);
    assert.throws(() => addRoute(root, '/x', 'no-such'), /No component/);
  });

  test('manifest lists components, services and routes', () => {
    generateService(root, 'cart-service');
    assert.deepStrictEqual(manifest(root), {
      name: 'demo',
      version: '2.3.4',
      components: [
        { tag: 'home-page', path: 'src/components/home-page/home-page.ts' },
      ],
      services: ['src/services/cart-service.ts'],
      routes: [{ path: '/', component: 'home-page' }],
    });
  });

  test('mcp serves the tools over JSON-RPC', () => {
    interface ToolResult {
      isError: boolean;
      content: Array<{ type: string; text: string }>;
    }
    const call = <T = Record<string, unknown>>(
      method: string,
      params?: object
    ) =>
      handleMcp(root, { id: 1, method, params }) as unknown as {
        result: T;
        error?: { code: number };
      };

    const init = call<{
      capabilities: { tools: Record<string, never> };
      serverInfo: { version: string };
    }>('initialize').result;
    assert.deepStrictEqual(init.capabilities, { tools: {} });
    assert.strictEqual(init.serverInfo.version, '2.3.4');
    assert.strictEqual(
      call<{ tools: unknown[] }>('tools/list').result.tools.length,
      4
    );
    assert.strictEqual(
      handleMcp(root, { method: 'notifications/initialized' }),
      undefined
    );
    assert.strictEqual(call('nope').error?.code, -32601);

    const created = call<ToolResult>('tools/call', {
      name: 'generate_component',
      arguments: { name: 'user-card' },
    }).result;
    assert.strictEqual(created.isError, false);
    assert.ok(fs.existsSync(path.join(root, 'src/components/user-card')));

    const failed = call<ToolResult>('tools/call', {
      name: 'add_route',
      arguments: { path: '/x', component: 'no-such' },
    }).result;
    assert.strictEqual(failed.isError, true);
    assert.match(failed.content[0].text, /No component/);
  });
});
