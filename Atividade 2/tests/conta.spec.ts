import { test, expect } from '@playwright/test';

test.describe('Página Minha Conta', () => {

  test('deve exibir os dados da conta', async ({ page }) => {
    await page.goto('/conta');

    await expect(page).toHaveURL(/\/conta$/);

    await expect(
      page.getByText('Login realizado com sucesso.')
    ).toBeVisible();

    await expect(
      page.getByTestId('usuario')
    ).toHaveText('Usuário: Ana');

    await expect(
      page.getByRole('link', { name: 'Sair' })
    ).toBeVisible();
  });

  test('deve permitir sair da conta', async ({ page }) => {
    await page.goto('/conta');

    await page.getByRole('link', { name: 'Sair' }).click();

    await expect(page).toHaveURL(/\/login$/);
  });

});
