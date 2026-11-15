import { test, expect } from '@playwright/test';

// Covers MIME-type and module-load failures, CSP violations and uncaught
// errors, on the home page and on a nested deep link.
for (const path of ['/', '/user/Ada']) {
  test(`no console or page errors on ${path}`, async ({
    page,
    browserName,
  }) => {
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto(path, { waitUntil: 'networkidle' });

    // Firefox preloads the script and stylesheet while it is still parsing,
    // before index.html has set <base>, so on a nested path it first asks for
    // them relative to the page (/user/assets/…) and reports that miss. It
    // then loads the right files; the deep-link test in app.spec.js checks
    // that the page works. Only those preload misses are excused.
    const preloadMiss = (error) =>
      browserName === 'firefox' && error.includes('/user/assets/');

    expect(errors.filter((error) => !preloadMiss(error))).toEqual([]);
  });
}
