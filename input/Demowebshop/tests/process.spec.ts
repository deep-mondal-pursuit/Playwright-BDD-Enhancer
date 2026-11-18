import { test, expect } from '@playwright/test';
import { loginToDemoShop } from './login.helper';

test("Login and Add to cart item in demowebshop", async ({ page }) => {
    
    // Call the separate login script steps in 1 continuous go
    await loginToDemoShop(page);

    // Click on the "Electronics" category link
    await page.getByRole('link', { name: 'Electronics' }).first().hover();

    // Click on the "Cell phones" subcategory link
    await page.getByRole('link', { name: 'Cell phones' }).click();

    // Verify the Cell phones page is displayed
    await expect(page.getByRole('heading', { name: 'Cell phones' })).toBeVisible();

    // Click on the "Smartphone" product link
    await page.getByRole('link', { name: 'Smartphone', exact: true }).click();

    // Verify the product page is displayed
    await expect(page.getByRole('heading', { name: 'Smartphone' })).toBeVisible();

    // Click on the "Add to cart" button
    await page.getByRole('button', { name: 'Add to cart' }).nth(0).click();

    // Wait for 3 Second
    await page.waitForTimeout(3000);

    // Verify the product is added to the cart by checking the presence of the "Shopping cart" link
    await page.getByRole('link', { name: 'Shopping cart', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Shopping cart' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Smartphone' })).toBeVisible();

    // Click on the "Remove" checkbox for the product
    await page.locator("input[name='removefromcart']").check();

    // Click on the "Update shopping cart" button
    await page.getByRole('button', { name: 'Update shopping cart' }).click();

    // Click on the "Log out" link
    await page.getByRole('link', { name: 'Log out' }).click();

    // Verify the user is logged out by checking the presence of the "Log in" link
    await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
});