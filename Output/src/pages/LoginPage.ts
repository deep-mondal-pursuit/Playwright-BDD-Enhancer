import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { getUser, type Role } from '../config/env';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Log in' });
  }

  /** Logs in as the given role and returns the e-mail that was entered. */
  async loginAs(role: Role): Promise<string> {
    const { username, password } = getUser(role);
    await this.emailInput.fill(username);
    const enteredEmail = await this.emailInput.inputValue();
    await this.passwordInput.fill(password);
    await this.loginButton.press('Enter');
    return enteredEmail;
  }
}
