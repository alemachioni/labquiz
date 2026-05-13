import { test, expect } from '@playwright/test';

test('aluno completa uma rodada', async ({ page }) => {
  await page.goto('http://localhost:5173')
  await page.fill('[placeholder="E-mail"]', 'aluno@teste.com')
  await page.fill('[placeholder="Senha"]', '123456')
  await page.click('button:has-text("Entrar")')
  await expect(page).toHaveURL('/modulos')
  await page.click('text=Vidrarias')
});

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});