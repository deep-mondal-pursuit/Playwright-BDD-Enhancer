import { When, Then } from '../hooks/bdd';
import { expect } from '@playwright/test';
import type { TestWorld } from '../hooks/world';
import { BasePage } from '../src/pages/BasePage';
import { CatalogPage } from '../src/pages/CatalogPage';
import { CartPage } from '../src/pages/CartPage';

Then(
  'the {string} category should be displayed in the menu',
  async function (this: TestWorld, category: string) {
    await expect(new BasePage(this.page).topMenuLink(category)).toBeVisible();
  },
);

When(
  'the user browses to the {string} category under {string}',
  async function (this: TestWorld, subcategory: string, category: string) {
    await new CatalogPage(this.page).openSubcategory(category, subcategory);
  },
);

When('the user opens the product {string}', async function (this: TestWorld, productName: string) {
  await new CatalogPage(this.page).openProduct(productName);
});

When('the user adds the product to the cart', async function (this: TestWorld) {
  const catalog = new CatalogPage(this.page);
  await catalog.addToCart();
  // Replaces the original hard wait: proceed once the shop confirms the item was added.
  await expect(catalog.addedToCartNotification).toBeVisible();
});

When('the user opens the shopping cart', async function (this: TestWorld) {
  await new BasePage(this.page).openShoppingCart();
});

Then('the {string} page should be displayed', async function (this: TestWorld, title: string) {
  await expect(new BasePage(this.page).heading(title)).toBeVisible();
});

Then(
  'the shopping cart should contain the product {string}',
  async function (this: TestWorld, productName: string) {
    await expect(new CartPage(this.page).productLink(productName)).toBeVisible();
  },
);

When(
  'the user removes the product {string} from the cart',
  async function (this: TestWorld, productName: string) {
    await new CartPage(this.page).removeProduct(productName);
  },
);
