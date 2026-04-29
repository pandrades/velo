import { test, expect } from '@playwright/test'

/// AAA - Arrange, Act, Assert

test('deve consultar um pedido aprovado', async ({ page }) => {
  // Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  // Act
  // await page.locator('//label[text()="Número do Pedido"]/..//imput').fill('VLO-9C6DL3')
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-9C6DL3')
  // await page.getByLabel('Número do Pedido').fill('VLO-9C6DL3')
  // await page.getByPlaceholder('Ex: VLO-ABC123').fill('VLO-9C6DL3')


  await page.getByTestId('search-order-button').click()


  // Assert
  await expect(page.getByTestId('order-result-id')).toBeVisible({ timeout: 10000 })
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-9C6DL3')
  
  await expect(page.getByTestId('order-result-status')).toBeVisible()
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')

})