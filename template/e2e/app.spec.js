import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Boba App/);
});

test('nav links navigate without reloading and mark the current page', async ({
  page,
}) => {
  await page.goto('/');
  await page.evaluate(() => (window.stillSamePage = true));

  for (const [name, path, tag] of [
    ['To-Do', '/todo', 'todo-page'],
    ['Users', '/users', 'users-page'],
  ]) {
    const link = page
      .locator('app-nav [data-nav]')
      .getByRole('link', { name })
      .first();
    await link.click();
    await expect(page).toHaveURL(path);
    await expect(page.locator(`#router-outlet > ${tag}`)).toBeVisible();
    await expect(link).toHaveAttribute('aria-current', 'page');
  }
  expect(await page.evaluate(() => window.stillSamePage)).toBe(true);

  await page.goBack();
  await expect(page.locator('#router-outlet > todo-page')).toBeVisible();
});

test('links inside pages are handled by the router', async ({ page }) => {
  await page.goto('/user/Ada');
  await page.evaluate(() => (window.stillSamePage = true));
  await page.getByRole('link', { name: 'Back to all users' }).click();
  await expect(page.locator('users-page')).toBeVisible();
  expect(await page.evaluate(() => window.stillSamePage)).toBe(true);
});

test('deep links load, including nested routes with parameters', async ({
  page,
}) => {
  await page.goto('/todo');
  await expect(page.locator('todo-page')).toBeVisible();

  await page.goto('/user/Grace%20Hopper');
  await expect(page.locator('user-page #user-name')).toHaveText('Grace Hopper');
});

test('unknown routes show the not-found page', async ({ page }) => {
  await page.goto('/no/such/page');
  await expect(page.locator('not-found-page')).toContainText('Page Not Found');
  await page.getByRole('link', { name: 'Go back home' }).click();
  await expect(page.locator('home-page')).toBeVisible();
});

test('to-do list: add, complete, filter, delete and persist', async ({
  page,
}) => {
  await page.goto('/todo');
  const items = page.locator('#task-list li');
  await expect(items).toHaveCount(3);

  await page.fill('#new-task-input', 'Brew tea');
  await page.keyboard.press('Enter');
  await expect(items).toHaveCount(4);
  await expect(page.locator('#new-task-input')).toHaveValue('');

  const brewTea = items.filter({ hasText: 'Brew tea' });
  await brewTea.locator('.toggle-task').click();
  await page.click('.filter-btn[data-filter="completed"]');
  await expect(items).toHaveCount(2);
  await page.click('.filter-btn[data-filter="active"]');
  await expect(items).toHaveCount(2);
  await expect(brewTea).toHaveCount(0);

  await page.click('.filter-btn[data-filter="all"]');
  await items.filter({ hasText: 'Discover' }).locator('.delete-task').click();
  await expect(items).toHaveCount(3);

  await page.reload();
  await expect(items).toHaveCount(3);
  await expect(brewTea).toBeVisible();
});

test('users: loads from the API, validates the form, links to a profile', async ({
  page,
}) => {
  await page.goto('/users');
  const items = page.locator('#user-list li');
  await expect(items).toHaveCount(3);
  const name = page.getByLabel('Name');
  const invalid = () => name.evaluate((input) => input.validationMessage);

  // Built-in validation: nothing is added while a required field is empty.
  await page.getByRole('button', { name: 'Add user' }).click();
  await expect(items).toHaveCount(3);
  expect(await invalid()).not.toBe('');

  // A rule from the service, reported through the same mechanism.
  await name.fill('ada');
  await page.getByLabel('Role').selectOption('Designer');
  await page.getByRole('button', { name: 'Add user' }).click();
  expect(await invalid()).toContain('already in the list');
  await expect(items).toHaveCount(3);

  await name.fill('Margaret');
  await page.getByRole('button', { name: 'Add user' }).click();
  await expect(items).toHaveCount(4);
  await expect(page.getByRole('status')).toHaveText('Added Margaret.');

  await page.getByRole('link', { name: 'Margaret' }).click();
  await expect(page).toHaveURL('/user/Margaret');
  await expect(page.locator('#user-name')).toHaveText('Margaret');
});

test.describe('with a failing API', () => {
  // Requests made by the service worker would bypass page.route().
  test.use({ serviceWorkers: 'block' });

  test('users: shows an error when the API fails', async ({ page }) => {
    await page.route('**/data/users.json', (route) =>
      route.fulfill({ status: 500 })
    );
    await page.goto('/users');
    await expect(page.getByRole('status')).toContainText('HTTP 500');
  });
});

test('is installable: manifest and icons resolve', async ({
  page,
  request,
}) => {
  await page.goto('/');
  const href = await page
    .locator('link[rel="manifest"]')
    .evaluate((l) => l.href);
  const manifest = await (await request.get(href)).json();
  expect(manifest.name).toBe('Boba App');
  for (const icon of manifest.icons) {
    expect((await request.get(new URL(icon.src, href).href)).ok()).toBe(true);
  }
});

test('works offline after the first visit', async ({
  page,
  context,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'production',
    'the service worker is only registered in production builds'
  );
  await page.goto('/');
  await page.evaluate(() => navigator.serviceWorker.ready);
  // The worker caches the first page's files once it takes control.
  await expect
    .poll(() =>
      page.evaluate(
        async () => (await (await caches.open('boba-v1')).keys()).length
      )
    )
    .toBeGreaterThan(2);

  // Route components are cached as they are visited.
  await page.locator('app-nav').getByRole('link', { name: 'To-Do' }).click();
  await expect(page.locator('todo-page')).toBeVisible();

  await context.setOffline(true);
  await page.goto('/');
  await expect(page.locator('home-page')).toBeVisible();
  await page.goto('/todo');
  await expect(page.locator('todo-page')).toBeVisible();
});
