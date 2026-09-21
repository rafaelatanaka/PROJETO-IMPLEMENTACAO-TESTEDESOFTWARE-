import { test, expect } from '@playwright/test';

test.describe('Calculadora de Frete', () => {

  test('deve calcular R$ 15,00 para CEP iniciado em 8', async ({ page }) => {
    await page.goto('/frete');

    await page.locator('#cep').fill('80000000');
    await page.locator('#valor').fill('100');

    await page.getByRole('button', { name: 'Calcular frete' }).click();

    await expect(page.locator('#resultado')).toHaveText('Frete: R$ 15,00');
  });

  test('deve calcular R$ 25,00 para CEP que não inicia em 8', async ({ page }) => {
    await page.goto('/frete');

    await page.locator('#cep').fill('70000000');
    await page.locator('#valor').fill('100');

    await page.getByRole('button', { name: 'Calcular frete' }).click();

    await expect(page.locator('#resultado')).toHaveText('Frete: R$ 25,00');
  });

  test('deve oferecer frete grátis para pedido de R$ 200,00', async ({ page }) => {
    await page.goto('/frete');

    await page.locator('#cep').fill('80000000');
    await page.locator('#valor').fill('200');

    await page.getByRole('button', { name: 'Calcular frete' }).click();

    await expect(page.locator('#resultado')).toHaveText('Frete grátis');
  });

  test('deve oferecer frete grátis para pedido acima de R$ 200,00', async ({ page }) => {
    await page.goto('/frete');

    await page.locator('#cep').fill('70000000');
    await page.locator('#valor').fill('200,01');

    await page.getByRole('button', { name: 'Calcular frete' }).click();

    await expect(page.locator('#resultado')).toHaveText('Frete grátis');
  });

  test('deve calcular R$ 15,00 para pedido abaixo de R$ 200,00', async ({ page }) => {
    await page.goto('/frete');

    await page.locator('#cep').fill('80000000');
    await page.locator('#valor').fill('199,99');

    await page.getByRole('button', { name: 'Calcular frete' }).click();

    await expect(page.locator('#resultado')).toHaveText('Frete: R$ 15,00');
  });

  test('deve aceitar valor decimal com vírgula', async ({ page }) => {
    await page.goto('/frete');

    await page.locator('#cep').fill('80000000');
    await page.locator('#valor').fill('150,50');

    await page.getByRole('button', { name: 'Calcular frete' }).click();

    await expect(page.locator('#resultado')).toHaveText('Frete: R$ 15,00');
  });

  test('deve rejeitar CEP com 7 dígitos', async ({ page }) => {
    await page.goto('/frete');

    await page.locator('#cep').fill('8000000');
    await page.locator('#valor').fill('100');

    await page.getByRole('button', { name: 'Calcular frete' }).click();

    await expect(page.locator('#resultado')).toHaveText('Dados inválidos');
  });

  test('deve rejeitar CEP com 9 dígitos', async ({ page }) => {
    await page.goto('/frete');

    await page.locator('#cep').fill('800000000');
    await page.locator('#valor').fill('100');

    await page.getByRole('button', { name: 'Calcular frete' }).click();

    await expect(page.locator('#resultado')).toHaveText('Dados inválidos');
  });

  test('deve rejeitar CEP com letras', async ({ page }) => {
    await page.goto('/frete');

    await page.locator('#cep').fill('8000000A');
    await page.locator('#valor').fill('100');

    await page.getByRole('button', { name: 'Calcular frete' }).click();

    await expect(page.locator('#resultado')).toHaveText('Dados inválidos');
  });

  test('deve rejeitar valor zero', async ({ page }) => {
    await page.goto('/frete');

    await page.locator('#cep').fill('80000000');
    await page.locator('#valor').fill('0');

    await page.getByRole('button', { name: 'Calcular frete' }).click();

    await expect(page.locator('#resultado')).toHaveText('Dados inválidos');
  });

  test('deve rejeitar valor negativo', async ({ page }) => {
    await page.goto('/frete');

    await page.locator('#cep').fill('80000000');
    await page.locator('#valor').fill('-10');

    await page.getByRole('button', { name: 'Calcular frete' }).click();

    await expect(page.locator('#resultado')).toHaveText('Dados inválidos');
  });

});
