import { test, expect } from '@playwright/test';

test('aluno completa o fluxo de login', async ({ page }) => {
  await page.goto('http://localhost:5173')
  await page.click('text=Toque aqui para começar')
  await expect(page).toHaveURL('/login')
  await page.fill('[placeholder="seu@email.com"]', 'aluno@labquiz.com')
  await page.fill('[placeholder="••••••••"]', 'labquiz123')
  await page.click('button:has-text("Entrar")')
  await expect(page).toHaveURL('/modulos')
});
