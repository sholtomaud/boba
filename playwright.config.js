// The app under test lives in template/ — it is both what `create-boba-app`
// scaffolds and the demo site — so run its suite, from its directory.
import path from 'node:path';
import config from './template/playwright.config.js';

const cwd = path.join(import.meta.dirname, 'template');

export default {
  ...config,
  testDir: path.join(cwd, 'e2e'),
  webServer: config.webServer.map((server) => ({ ...server, cwd })),
};
