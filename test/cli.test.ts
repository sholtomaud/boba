import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const CLI = path.resolve('bin/create-boba-app.js');

describe('create-boba-app CLI', () => {
  let cwd: string;
  const appFile = (file: string) => path.join(cwd, 'test-app', file);

  before(() => {
    cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'create-boba-app-'));
    execFileSync('node', [CLI, 'test-app'], { cwd });
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
      'index.html',
      'postcss.config.js',
      'playwright.config.js',
      'e2e/app.spec.js',
      'scripts/boba.ts',
      'src/main.ts',
      'public/sw.js',
    ]) {
      assert.ok(fs.existsSync(appFile(file)), `${file} is missing`);
    }
  });

  it('leaves out local installs and build output', () => {
    for (const dir of ['node_modules', 'dist', 'test-results']) {
      assert.ok(!fs.existsSync(appFile(dir)), `${dir} was copied`);
    }
  });

  it('refuses to overwrite an existing directory', () => {
    assert.throws(() =>
      execFileSync('node', [CLI, 'test-app'], { cwd, stdio: 'pipe' })
    );
  });

  it('scaffolds an app whose own CLI works', () => {
    const output = execFileSync('node', ['scripts/boba.ts', 'manifest'], {
      cwd: appFile(''),
      encoding: 'utf-8',
    });
    assert.ok(JSON.parse(output).routes.length > 0);
  });
});
