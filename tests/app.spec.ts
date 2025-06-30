import { test, expect } from '@playwright/test';

// Base URL for the application. Assuming dev server runs on localhost:5173.
// Vite's default port is 5173. If your project uses a different port, update this.
const APP_BASE_URL = 'http://localhost:5173';
// Vite's default base path in this project is /ts-wc-templates/ for prod, but / for dev.
// Playwright tests will run against the dev server, so base is '/'.
const PROJECT_BASE_PATH = '/';

test.describe('App Navigation and Content', () => {
  test('should navigate to Home page and verify content', async ({ page }) => {
    await page.goto(`${APP_BASE_URL}${PROJECT_BASE_PATH}`);

    // Check that the URL is correct for the home page
    // For dev server, this will be APP_BASE_URL + '/'
    await expect(page).toHaveURL(`${APP_BASE_URL}/`);

    // Verify that the nav-page component is present
    await expect(page.locator('nav-page')).toBeVisible();

    // Verify that the home-page component is loaded
    await expect(page.locator('home-page')).toBeVisible();

    // Check for a known element on the home page, e.g., a heading
    // Assuming home-page has an h1 with "ts-wc-template"
    await expect(page.locator('home-page').getByRole('heading', { name: 'ts-wc-template', level: 1 })).toBeVisible();
  });

  test('should navigate to About page and verify content', async ({ page }) => {
    // Start at the home page
    await page.goto(`${APP_BASE_URL}${PROJECT_BASE_PATH}`);

    // Click navigation link to About page
    // Assumes nav-page has a link with text "About"
    await page.locator('nav-page').getByRole('link', { name: 'About' }).click();

    // Check that the URL is correct for the about page
    await expect(page).toHaveURL(`${APP_BASE_URL}/about`);

    // Verify that the about-page component is loaded
    await expect(page.locator('about-page')).toBeVisible();

    // Check for a known element on the about page, e.g., a heading
    // Assuming about-page has an h1 with "About"
    await expect(page.locator('about-page').getByRole('heading', { name: 'About', level: 1 })).toBeVisible();
  });

  test('should navigate to TODO page and verify content', async ({ page }) => {
    // Start at the home page
    await page.goto(`${APP_BASE_URL}${PROJECT_BASE_PATH}`);

    // Click navigation link to TODO page
    // Assumes nav-page has a link with text "TODO"
    await page.locator('nav-page').getByRole('link', { name: 'TODO' }).click();

    // Check that the URL is correct for the todo page
    await expect(page).toHaveURL(`${APP_BASE_URL}/todo`);

    // Verify that the todo-page component is loaded
    await expect(page.locator('todo-page')).toBeVisible();

    // Check for a known element on the todo page, e.g., a heading
    // Assuming todo-page has an h1 with "My Boba To-Do List"
    await expect(page.locator('todo-page').getByRole('heading', { name: 'My Boba To-Do List', level: 1 })).toBeVisible();
  });

  test('should show 404 for an unknown route', async ({ page }) => {
    await page.goto(`${APP_BASE_URL}${PROJECT_BASE_PATH}unknown-route`);

    // Check that the URL remains what was navigated to
    await expect(page).toHaveURL(`${APP_BASE_URL}/unknown-route`);

    // Assuming the 404 content is within the main app outlet and not a full browser 404
    // And that a specific element/text indicates the 404 page, e.g., an h1 with "404" or "Page Not Found"
    // The router currently shows "404 - Page Not Found" in the main content area.
    // Let's assume the router places this inside a div in the main-content area.
    // We also need to ensure the specific 404 component isn't one of the known pages.
    await expect(page.locator('home-page')).not.toBeVisible();
    await expect(page.locator('about-page')).not.toBeVisible();
    await expect(page.locator('todo-page')).not.toBeVisible();

    // Check for the 404 message. This might need adjustment based on how your router displays 404.
    // Router.ts seems to set `this.contentOutlet.innerHTML = '<h1>404 - Page Not Found</h1>';`
    await expect(page.getByRole('heading', { name: '404 - Page Not Found', level: 1 })).toBeVisible();
  });
});
