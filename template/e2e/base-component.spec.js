import { test, expect } from '@playwright/test';

// A component moved in the DOM (appended to another parent) is disconnected
// and reconnected. It must keep its markup and state, and init() must not
// run again: a second init() re-renders over what the user did and adds
// another copy of every listener it set up on window, stores or the router.
test('moving a component keeps its markup and does not run init() again', async ({
  page,
}) => {
  await page.goto('/');
  const nav = page.locator('app-nav');
  await expect(nav).toBeVisible();

  const result = await page.evaluate(() => {
    const el = document.querySelector('app-nav');
    const before = el.querySelectorAll('*').length;
    const first = el.querySelector('[data-nav]');
    first.dataset.marker = 'kept';
    const holder = document.createElement('div');
    document.body.append(holder);
    holder.append(el); // disconnects, then reconnects
    return {
      sameElement: el.querySelector('[data-nav]') === first,
      marker: el.querySelector('[data-nav]')?.dataset.marker,
      before,
      after: el.querySelectorAll('*').length,
    };
  });
  expect(result).toEqual({
    sameElement: true,
    marker: 'kept',
    before: result.before,
    after: result.before,
  });
});

// Subscriptions to long-lived objects belong in connected(), removed in
// disconnectedCallback(): app-nav does this with the router, so after a move
// it still marks the current page.
test('a moved component re-subscribes in connected(): app-nav still follows the router', async ({
  page,
}) => {
  await page.goto('/');
  await page.evaluate(() => {
    const el = document.querySelector('app-nav');
    const holder = document.createElement('div');
    el.parentElement.insertBefore(holder, el);
    holder.append(el);
  });
  const link = page
    .locator('app-nav [data-nav]')
    .getByRole('link', { name: 'Users' })
    .first();
  await link.click();
  await expect(page).toHaveURL('/users');
  await expect(link).toHaveAttribute('aria-current', 'page');
});
