import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  test: {
    globals: true,
    projects: [
      {
        name: 'browser',
        test: {
          browser: {
            enabled: true,
            instances: [{ browser: 'chromium' }],
            provider: playwright(),
            headless: true,
          },
          include: ['src/**/*.{test,spec}.{js,ts}'],
        },
      },
      {
        name: 'node',
        test: {
          environment: 'node',
          include: ['test/**/*.{test,spec}.{js,ts}'],
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
