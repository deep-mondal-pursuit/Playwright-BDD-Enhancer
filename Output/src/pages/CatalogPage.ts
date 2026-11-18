import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Category listing and product detail pages. */
export class CatalogPage extends BasePage {
  readonly addToCartButton: Locator;
  readonly addedToCartNotification: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' }).first();
    this.addedToCartNotification = page.getByText(
      'The product has been added to your shopping cart',
    );
  }

  /** Hovers the top-menu category and clicks one of its sub-categories. */
  async openSubcategory(category: string, subcategory: string): Promise<void> {
    await this.topMenuLink(category).hover();
    await this.page.getByRole('link', { name: subcategory }).click();
  }

  async openProduct(productName: string): Promise<void> {
    await this.page.getByRole('link', { name: productName, exact: true }).click();
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
