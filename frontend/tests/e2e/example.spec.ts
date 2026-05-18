import { test, expect } from '@playwright/test';

test('aluno completa uma rodada', async ({ page }) => {
  await page.goto('http://localhost:5173')
  await page.fill('[placeholder="E-mail"]', 'aluno@labquiz.com')
  await page.fill('[placeholder="Senha"]', 'labquiz123')
  await page.click('button:has-text("Entrar")')
  await expect(page).toHaveURL('/modulos')
  await page.click('text=Vidrarias')
});