import { test, expect } from '@playwright/test';

import { orderMock } from './mock';

test('Создание заказа', async ({ page, context }) => {
  await test.step('Открываем конструктор бургеров', async () => {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await expect(page.getByText('Соберите бургер')).toBeVisible();
  });

  await test.step('Вызывает попап ингредиента', async () => {
    // Открываем попап ингредиента
    await page.locator('.test-drag-item-main').first().click();

    await expect(page.getByText('Детали ингредиента')).toBeVisible();

    // Закрываем попап
    await page.keyboard.press('Escape');
  });

  await test.step('Добавляем ингредиенты', async () => {
    const dropZoneBunTop = page.locator('.drop-zone-bun-top');
    const dropZoneBunBottom = page.locator('.drop-zone-bun-bottom');
    const dropZoneIngredient = page.locator('.drop-zone-ingredient');

    // Перетаскиваем булки
    await page
      .locator('.test-drag-item-bun')
      .first()
      .dragTo(page.locator('.drop-zone-bun-top'));

    // Перетаскиваем начинку
    await page
      .locator('.test-drag-item-main')
      .first()
      .dragTo(page.locator('.drop-zone-ingredient'));

    // Перетаскиваем соус
    await page
      .locator('.test-drag-item-sauce')
      .first()
      .dragTo(page.locator('.drop-zone-ingredient'));

    await page
      .locator('.test-ingredient-name-bun')
      .first()
      .textContent()
      .then(async (name) => {
        // Игредиент булка в верхней дропзоне
        await expect(dropZoneBunTop).toContainText(name ?? 'no_name_find', {
          ignoreCase: true,
        });

        // Игредиент булка в нижней дропзоне
        await expect(dropZoneBunBottom).toContainText(name ?? 'no_name_find', {
          ignoreCase: true,
        });
      });

    await page
      .locator('.test-ingredient-name-main')
      .first()
      .textContent()
      .then(async (name) => {
        // Игредиент начинка в дропзоне
        await expect(dropZoneIngredient).toContainText(name ?? 'no_name_find', {
          ignoreCase: true,
        });
      });
  });

  await test.step('Создаем заказ', async () => {
    await context.route('**/api/auth/user', (route) => {
      console.log('intercept');
      void route.fulfill({
        status: 200,
        body: JSON.stringify({ isError: false }),
      });
    });

    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    await context.route(
      'https://new-stellarburgers.education-services.ru/api/orders',
      (route) => {
        void route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(orderMock),
        });
      }
    );

    await expect(page.getByText('идентификатор заказа')).toBeVisible();
  });
});
