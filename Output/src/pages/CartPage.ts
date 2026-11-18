import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly updateCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.updateCartButton = page.getByRole('button', { name: 'Update shopping cart' });
  }

  productLink(productName: string): Locator {
    return this.page.getByRole('link', { name: productName, exact: true });
  }

  /** Ticks the "Remove" checkbox in the row of the given product and updates the cart. */
  async removeProduct(productName: string): Promise<void> {
    const row = this.page.getByRole('row').filter({ has: this.productLink(productName) });
    await row.locator("input[name='removefromcart']").check();
    await this.updateCartButton.click();
  }
}
