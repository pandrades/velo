import { test, expect, type Page, type Locator } from '@playwright/test';

const LOGIN_URL =
  process.env.CMA_LOGIN_URL ??
  'https://ctdevwebfrontend.cma.com.br/CMA/TROM/TRADING-BRASIL';
const USER = process.env.CMA_USER ?? '';
const PASSWORD = process.env.CMA_PASSWORD ?? '';

async function firstVisible(page: Page, locators: Locator[]): Promise<Locator> {
  for (const locator of locators) {
    const candidate = locator.first();
    if (await candidate.isVisible({ timeout: 2000 }).catch(() => false)) {
      return candidate;
    }
  }
  throw new Error('Nenhum campo visível encontrado entre os seletores tentados.');
}

test.describe('CMA TROM TRADING-BRASIL', () => {
  test('loga com usuário e senha', async ({ page }) => {
    test.skip(!USER || !PASSWORD, 'Defina CMA_USER e CMA_PASSWORD no arquivo .env');

    await page.goto(LOGIN_URL);

    const userField = await firstVisible(page, [
      page.getByLabel(/usu[aá]rio|user|login|código|codigo/i),
      page.getByPlaceholder(/usu[aá]rio|user|login|código|codigo/i),
      page.locator('input[name="username"], input[name="user"], input[name="UserName"], input[name="login"]'),
      page.locator('input[type="text"]:visible, input[type="email"]:visible, input:not([type]):visible'),
    ]);

    const passwordField = await firstVisible(page, [
      page.getByLabel(/senha|password/i),
      page.getByPlaceholder(/senha|password/i),
      page.locator('input[type="password"]:visible'),
    ]);

    await userField.fill(USER);
    await passwordField.fill(PASSWORD);

    const submit = page
      .getByRole('button', { name: /entrar|login|acessar|sign in|conectar/i })
      .or(page.locator('button[type="submit"], input[type="submit"]'))
      .first();

    await Promise.all([
      page.waitForURL((url) => !/\/login\/?/i.test(url.pathname), { timeout: 45_000 }).catch(() => null),
      submit.click(),
    ]);

    const stillOnLogin = /\/login\/?/i.test(new URL(page.url()).pathname);
    const errorMessage = page.getByText(/inv[aá]lid|incorret|falha|erro|unauthorized|não autorizado/i);

    await expect(errorMessage).toHaveCount(0);
    expect(stillOnLogin, 'A sessão permaneceu na tela de login após o submit').toBeFalsy();
  });
});
