import fs from 'node:fs';
import path from 'node:path';
import {
  chromium,
  firefox,
  webkit,
  defineConfig,
  devices,
} from '@playwright/test';

// Playwright expects the exact Chromium build it pins. Where that build isn't
// installed and can't be downloaded (e.g. a sandbox that blocks the Playwright
// CDN but ships browsers for a different Playwright release), fall back to the
// newest Chromium already in the browsers directory. CI runs in the matching
// Playwright container image, so it always gets the pinned build.
function fallbackChromium() {
  const expected = chromium.executablePath();
  if (fs.existsSync(expected)) return undefined;

  const parts = expected.split(path.sep);
  const buildIndex = parts.findIndex((part) => /^chromium-\d+$/.test(part));
  if (buildIndex === -1) return undefined;
  const browsersDir = parts.slice(0, buildIndex).join(path.sep);
  const relativePath = parts.slice(buildIndex + 1);
  if (!fs.existsSync(browsersDir)) return undefined;

  const candidate = fs
    .readdirSync(browsersDir)
    .filter((name) => /^chromium-\d+$/.test(name))
    .sort((a, b) => Number(b.split('-')[1]) - Number(a.split('-')[1]))
    .map((name) => path.join(browsersDir, name, ...relativePath))
    .find((file) => fs.existsSync(file));

  // Workers reload this config; only the main process needs to say so.
  if (candidate && !process.env.TEST_WORKER_INDEX) {
    console.warn(
      `Playwright's pinned Chromium is not installed; using ${candidate}`
    );
  }
  return candidate;
}

const executablePath = fallbackChromium();
const launchOptions = executablePath ? { executablePath } : {};

// Firefox and WebKit run against the production build. CI always runs them;
// locally they run when installed (`npx playwright install`).
const production = { baseURL: 'http://localhost:3000' };
const otherBrowsers = [
  { name: 'firefox', type: firefox, device: 'Desktop Firefox' },
  { name: 'webkit', type: webkit, device: 'Desktop Safari' },
]
  .filter(({ type }) => process.env.CI || fs.existsSync(type.executablePath()))
  .map(({ name, device }) => ({
    name,
    use: { ...devices[device], ...production },
  }));

export default defineConfig({
  testDir: './e2e',
  testIgnore: 'subpath.spec.js',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], launchOptions },
    },
    {
      name: 'production',
      use: { ...devices['Desktop Chrome'], launchOptions, ...production },
    },
    ...otherBrowsers,
    {
      // The app built for, and served from, a sub-path.
      name: 'subpath',
      testMatch: 'subpath.spec.js',
      testIgnore: [],
      use: {
        ...devices['Desktop Chrome'],
        launchOptions,
        baseURL: 'http://localhost:3001/sub/path/',
      },
    },
  ],
  webServer: [
    {
      command: 'npm run dev -- --port 5173 --strictPort',
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run build && npm run preview -- --port 3000 --strictPort',
      url: 'http://localhost:3000',
      reuseExistingServer: !process.env.CI,
    },
    {
      command:
        'npm run build -- --base /sub/path/ --outDir dist-subpath && npm run preview -- --base /sub/path/ --outDir dist-subpath --port 3001 --strictPort',
      url: 'http://localhost:3001/sub/path/',
      reuseExistingServer: !process.env.CI,
    },
  ],
});
