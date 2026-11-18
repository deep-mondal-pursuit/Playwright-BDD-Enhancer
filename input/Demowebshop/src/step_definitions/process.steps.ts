import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

declare const global: {
  page: import('@playwright/test').Page;
  browser: import('@playwright/test').Browser;
};

When('the user adds the product {string} to the cart', async (productName: string) => {
  const page = global.page;
  await page.getByRole('link', { name: 'Electronics' }).first().hover();
  await page.getByRole('link', { name: 'Cell phones' }).click();
  await expect(page.getByRole('heading', { name: 'Cell phones' })).toBeVisible();

  await page.getByRole('link', { name: productName, exact: true }).click();
  await expect(page.getByRole('heading', { name: productName })).toBeVisible();
  await page.getByRole('button', { name: 'Add to cart' }).nth(0).click();
});

When('the user opens the shopping cart', async () => {
  const page = global.page;
  await page.getByRole('link', { name: 'Shopping cart', exact: true }).click();
});

Then('the shopping cart should contain the product', async () => {
  const page = global.page;
  await expect(page.getByRole('heading', { name: 'Shopping cart' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Smartphone' })).toBeVisible();
});

When('the user removes the product and logs out', async () => {
  const page = global.page;
  await page.locator("input[name='removefromcart']").check();
  await page.getByRole('button', { name: 'Update shopping cart' }).click();
  await page.getByRole('link', { name: 'Log out' }).click();
});

Then('the user should be logged out successfully', async () => {
  const page = global.page;
  await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
  await global.browser.close();
});