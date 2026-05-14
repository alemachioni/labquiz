import { test, expect } from '@playwright/test';

test('aluno completa uma rodada', async ({ page }) => {
  await page.goto('http://localhost:5173')
  await page.fill('[placeholder="E-mail"]', 'aluno@teste.com')
  await page.fill('[placeholder="Senha"]', '123456')
  await page.click('button:has-text("Entrar")')
  await expect(page).toHaveURL('/modulos')
  await page.click('text=Vidrarias')
});