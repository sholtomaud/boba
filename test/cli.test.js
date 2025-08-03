import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const TEST_APP_NAME = 'test-app';
const TEST_APP_PATH = path.resolve(process.cwd(), TEST_APP_NAME);

describe('create-boba-app CLI', () => {
  beforeAll(() => {
    // Clean up any previous test app
    if (fs.existsSync(TEST_APP_PATH)) {
      fs.rmSync(TEST_APP_PATH, { recursive: true, force: true });
    }
  });

  afterAll(() => {
    // Clean up the test app
    if (fs.existsSync(TEST_APP_PATH)) {
      fs.rmSync(TEST_APP_PATH, { recursive: true, force: true });
    }
  });

  it('should create a new boba app', () => {
    execSync(`node bin/create-boba-app.js ${TEST_APP_NAME}`, { stdio: 'inherit' });

    expect(fs.existsSync(TEST_APP_PATH)).toBe(true);
    expect(fs.existsSync(path.join(TEST_APP_PATH, 'package.json'))).toBe(true);

    const packageJsonContent = fs.readFileSync(path.join(TEST_APP_PATH, 'package.json'), 'utf-8');
    const packageJson = JSON.parse(packageJsonContent);
    expect(packageJson.name).toBe(TEST_APP_NAME);
  });
});
