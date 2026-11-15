// Tests for the pages only the Boba site has; the app's own tests run too.
import { test, expect } from '@playwright/test';

test('home page presents the framework', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('home-page h1')).toHaveText('Boba Framework');
  await page.getByRole('link', { name: 'Get Started' }).click();
  await expect(page.locator('docs-page')).toBeVisible();
});

test('docs and about are in the nav and load as deep links', async ({
  page,
}) => {
  await page.goto('/about');
  await expect(page.locator('about-page')).toBeVisible();

  const docs = page.locator('app-nav nav').getByRole('link', { name: 'Docs' });
  await docs.click();
  await expect(page).toHaveURL('/docs');
  await expect(docs).toHaveAttribute('aria-current', 'page');
});

test('links in page footers are handled by the router', async ({ page }) => {
  await page.goto('/about');
  await page.evaluate(() => (window.stillSamePage = true));
  await page
    .locator('about-page footer')
    .getByRole('link', { name: 'Docs' })
    .click();
  await expect(page.locator('docs-page')).toBeVisible();
  expect(await page.evaluate(() => window.stillSamePage)).toBe(true);
});

test('in-page anchors stay on the page', async ({ page }) => {
  await page.goto('/docs');
  await page.locator('docs-page a[href="#routing"]').click();
  await expect(page).toHaveURL('/docs#routing');
  await expect(page.locator('docs-page #routing')).toBeInViewport();
});

test.describe('build status', () => {
  // Requests made by the service worker would bypass page.route().
  test.use({ serviceWorkers: 'block' });

  test('is hidden when the build has no record', async ({ page }) => {
    await page.route('**/data/build.json', (route) =>
      route.fulfill({ status: 404 })
    );
    await page.goto('/');
    await expect(page.locator('home-page h1')).toBeVisible();
    await expect(page.locator('#build-status')).toBeHidden();
  });

  test('shows the commit and run the deploy recorded', async ({ page }) => {
    await page.route('**/data/build.json', (route) =>
      route.fulfill({
        json: {
          commit: '0123456789abcdef',
          commitUrl: 'https://github.com/o/r/commit/0123456789abcdef',
          runUrl: 'https://github.com/o/r/actions/runs/42',
          builtAt: '2026-11-15T00:00:00Z',
        },
      })
    );
    await page.goto('/');
    const status = page.locator('#build-status');
    await expect(status).toBeVisible();
    await expect(status.locator('[data-commit]')).toHaveText('0123456');
    await expect(status.locator('[data-run]')).toHaveAttribute(
      'href',
      'https://github.com/o/r/actions/runs/42'
    );
  });
});
