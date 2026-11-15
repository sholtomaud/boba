// Runs against a build made with `--base /sub/path/` and served from there,
// as on GitHub Pages project sites. URLs here are relative to that base.
import { test, expect } from '@playwright/test';

test('the app works when served from a sub-path', async ({ page }) => {
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto('./');
  await expect(page.locator('home-page')).toBeVisible();

  // In-app links are written without the base; the router adds it.
  await page.locator('app-nav').getByRole('link', { name: 'Users' }).click();
  await expect(page).toHaveURL(/\/sub\/path\/users$/);

  // Requests made by the app (here the users API) resolve from the base.
  await expect(page.locator('#user-list li')).toHaveCount(3);

  expect(errors).toEqual([]);
});

test('nested deep links load under a sub-path', async ({ page }) => {
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('./user/Ada', { waitUntil: 'networkidle' });
  await expect(page.locator('#user-name')).toHaveText('Ada');
  await expect(page.locator('app-nav img')).toHaveJSProperty('complete', true);
  expect(
    await page.locator('app-nav img').evaluate((img) => img.naturalWidth)
  ).toBeGreaterThan(0);

  await page.goto('./no/such/page');
  await expect(page.locator('not-found-page')).toBeVisible();

  expect(errors).toEqual([]);
});
