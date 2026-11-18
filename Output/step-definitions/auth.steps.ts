import { Given, When, Then } from '../hooks/bdd';
import { expect } from '@playwright/test';
import type { TestWorld } from '../hooks/world';
import { BasePage } from '../src/pages/BasePage';
import { LoginPage } from '../src/pages/LoginPage';
import { getUser } from '../src/config/env';

Given('the user is on the login page', async function (this: TestWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open('/');
  await loginPage.verifyTitle('Demo Web Shop');
  await loginPage.logInLink.click();
});

When('the user logs in with valid credentials', async function (this: TestWorld) {
  await new LoginPage(this.page).loginAs('user');
});

Then('the user should be logged in', async function (this: TestWorld) {
  const { username } = getUser('user');
  await expect(new BasePage(this.page).accountLink(username)).toBeVisible();
});

When('the user logs out', async function (this: TestWorld) {
  await new BasePage(this.page).logOut();
});

Then('the user should be logged out successfully', async function (this: TestWorld) {
  await expect(new BasePage(this.page).logInLink).toBeVisible();
});
