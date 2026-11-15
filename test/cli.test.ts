import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

describe('create-boba-app CLI', () => {
  let cwd: string;
  let cli: string;
  const appFile = (file: string) => path.join(cwd, 'test-app', file);
  const run = (command: string, args: string[]) =>
    execFileSync(command, args, { cwd, encoding: 'utf-8', stdio: 'pipe' });

  before(() => {
    // Test the package as npm ships it, not the working tree: packing drops
    // some files (such as any named .gitignore).
    cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'create-boba-app-'));
    const tarball = execFileSync(
      'npm',
      ['pack', '--silent', '--pack-destination', cwd],
      { encoding: 'utf-8', shell: process.platform === 'win32' }
    ).trim();
    run('tar', ['-xzf', tarball]);
    cli = path.join(cwd, 'package', 'bin', 'create-boba-app.js');
    run('node', [cli, 'test-app']);
  });

  after(() => fs.rmSync(cwd, { recursive: true, force: true }));

  it('names the app after the project', () => {
    const packageJson = JSON.parse(
      fs.readFileSync(appFile('package.json'), 'utf-8')
    );
    assert.strictEqual(packageJson.name, 'test-app');
  });

  it('copies everything the app needs to build, test and run', () => {
    for (const file of [
      '.gitignore',
      'index.html',
      'package-lock.json',
      'postcss.config.js',
      'playwright.config.js',
      'e2e/app.spec.js',
      'scripts/boba.ts',
      'src/main.ts',
      'public/sw.js',
    ]) {
      assert.ok(fs.existsSync(appFile(file)), `${file} is missing`);
    }
    assert.match(
      fs.readFileSync(appFile('.gitignore'), 'utf-8'),
      /node_modules/
    );
    assert.ok(!fs.existsSync(appFile('gitignore')));
  });

  it('leaves out local installs and build output', () => {
    for (const dir of ['node_modules', 'dist', 'test-results']) {
      assert.ok(!fs.existsSync(appFile(dir)), `${dir} was copied`);
    }
  });

  it('refuses to overwrite an existing directory', () => {
    assert.throws(() => run('node', [cli, 'test-app']));
  });

  it('scaffolds an app whose own CLI works', () => {
    const output = execFileSync('node', ['scripts/boba.ts', 'manifest'], {
      cwd: appFile(''),
      encoding: 'utf-8',
    });
    assert.ok(JSON.parse(output).routes.length > 0);
  });

  it('ships a license', () => {
    assert.ok(fs.existsSync(path.join(cwd, 'package', 'LICENSE')));
  });
});
