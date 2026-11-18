import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Page, Browser, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

let browser: Browser;
let page: Page;

Given('the user is on the login page', async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto("https://demowebshop.tricentis.com/");
  await expect(page).toHaveTitle("Demo Web Shop");
  await page.getByRole('link', { name: 'Log in' }).click();
});

When('the user logs in with valid credentials', async () => {
  // Credentials are securely masked via environment variables
  await page.getByRole('textbox', { name: 'Email' }).fill(process.env.EMAIL!);
  const Email = await page.getByRole('textbox', { name: 'Email' }).inputValue();
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.PASSWORD!);
  
  await page.getByRole('button', { name: 'Log in' }).press('Enter');
  await expect(page.getByRole('link', { name: Email })).toBeVisible();
});

Then('the inventory page should be displayed', async () => {
  await expect(page.getByRole('link', { name: 'Electronics' }).first()).toBeVisible();
  // Keep browser context open for the next step file if needed
  global.page = page;
  global.browser = browser;
});