import { expect, type Locator, type Page } from '@playwright/test';

/** Header navigation and helpers shared by every Demo Web Shop page. */
export class BasePage {
  readonly logInLink: Locator;
  readonly logOutLink: Locator;
  readonly shoppingCartLink: Locator;

  constructor(readonly page: Page) {
    this.logInLink = page.getByRole('link', { name: 'Log in' });
    this.logOutLink = page.getByRole('link', { name: 'Log out' });
    this.shoppingCartLink = page.getByRole('link', { name: 'Shopping cart', exact: true });
  }

  /** Opens a path relative to BASE_URL. */
  async open(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  heading(name: string): Locator {
    return this.page.getByRole('heading', { name });
  }

  /** The header link showing the signed-in account e-mail. */
  accountLink(email: string): Locator {
    return this.page.getByRole('link', { name: email });
  }

  topMenuLink(name: string): Locator {
    return this.page.getByRole('link', { name }).first();
  }

  async openShoppingCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  async logOut(): Promise<void> {
    await this.logOutLink.click();
  }

  async verifyTitle(title: string): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }
}
