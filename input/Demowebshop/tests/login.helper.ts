import { Page, expect } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

export async function loginToDemoShop(page: Page) {
    // Open the demowebshop website
    await page.goto("https://demowebshop.tricentis.com/");

    // Verify the title of the page
    await expect(page).toHaveTitle("Demo Web Shop");

    // Click on the login link
    await page.getByRole('link', { name: 'Log in' }).click();

    // Fill the email and password securely using environment variables
    await page.getByRole('textbox', { name: 'Email' }).fill(process.env.EMAIL!);
    const Email = await page.getByRole('textbox', { name: 'Email' }).inputValue();
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env.PASSWORD!);

    // Click on the login button
    await page.getByRole('button', { name: 'Log in' }).press('Enter');

    // Verify the user is logged in by checking the presence of the email link
    await expect(page.getByRole('link', { name: Email })).toBeVisible();
}