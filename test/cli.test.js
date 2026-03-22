import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TEST_APP_NAME = 'test-app';
const TEST_APP_PATH = path.resolve(process.cwd(), TEST_APP_NAME);

describe('create-boba-app CLI', () => {
  before(() => {
    if (fs.existsSync(TEST_APP_PATH)) {
      fs.rmSync(TEST_APP_PATH, { recursive: true, force: true });
    }
  });

  after(() => {
    if (fs.existsSync(TEST_APP_PATH)) {
      fs.rmSync(TEST_APP_PATH, { recursive: true, force: true });
    }
  });

  it('should create a new boba app', () => {
    execSync(`node bin/create-boba-app.js ${TEST_APP_NAME}`, {
      stdio: 'inherit',
    });

    assert.strictEqual(fs.existsSync(TEST_APP_PATH), true);
    assert.strictEqual(fs.existsSync(path.join(TEST_APP_PATH, 'package.json')), true);

    const packageJsonContent = fs.readFileSync(
      path.join(TEST_APP_PATH, 'package.json'),
      'utf-8'
    );
    const packageJson = JSON.parse(packageJsonContent);
    assert.strictEqual(packageJson.name, TEST_APP_NAME);
  });
});
