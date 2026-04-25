import path from 'path';
import { fileURLToPath } from 'url';

import { test as setup, expect } from '@playwright/test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const authFile = path.join(__dirname, '.auth/user.json');

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('/login', { waitUntil: 'networkidle' });
  await page.getByLabel('E-mail').fill('email');
  await page.getByLabel('Пароль').fill('password');
  await page.getByRole('button', { name: 'Войти' }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('/');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(
    page.getByRole('button', { name: 'View profile and more' })
  ).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
