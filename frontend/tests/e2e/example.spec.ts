import { test, expect } from '@playwright/test';

test('fluxo completo do aluno', async ({ page }) => {
  await page.goto('https://labquiz-vsp4.vercel.app/login');

  // Login
  await page.locator('input[type="email"]')
    .fill('teste@aluno.cps.sp.gov.br');

  await page.locator('input[type="password"]')
    .fill('labquiz123');

  await page.getByRole('button', {
    name: /entrar/i,
  }).click();

  await expect(page).toHaveURL(/modulos/);

  // Iniciar jogo
  await page.getByRole('button', {
    name: /iniciar jogo/i,
  }).click();

  // Categoria
  await page.getByRole('button', {
    name: /vidrarias/i,
  }).click();

  // Dificuldade
  await page.getByRole('button', {
    name: /fácil/i,
  }).click();

  // Responde todas as questões
  while (true) {
    const alternativas = page.locator(
      'div.grid.grid-cols-2 button'
    );

    await alternativas.first().click();

    const verResultado = page.getByRole('button', {
      name: /ver resultado/i,
    });

    if (await verResultado.isVisible()) {
      await verResultado.click();
      break;
    }

    const proximo = page.getByRole('button', {
      name: /próxima/i,
    });

    await proximo.click();
  }

  // Tela de resultado
  await expect(
    page.getByRole('button', {
      name: /jogar novamente/i,
    })
  ).toBeVisible();

  // Reiniciar
  await page.getByRole('button', {
    name: /jogar novamente/i,
  }).click();
});
