import { test, expect } from '@playwright/test';

// Covers MIME-type and module-load failures, CSP violations and uncaught
// errors, on the home page and on a nested deep link.
for (const path of ['/', '/user/Ada']) {
  test(`no console or page errors on ${path}`, async ({ page }) => {
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto(path, { waitUntil: 'networkidle' });

    expect(errors).toEqual([]);
  });
}
