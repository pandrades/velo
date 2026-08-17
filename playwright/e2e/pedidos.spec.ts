import { test, expect } from '@playwright/test'

/// AAA - Arrange, Act, Assert

test('deve consultar um pedido aprovado', async ({ page }) => {

  //Test Data  
  const orderNumber = 'VLO-9C6DL3'

  // Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  // Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-9C6DL3')
  await page.locator('button:has-text("Buscar Pedido")').click()
  // await page.getByRole('button', { name: 'Buscar Pedido' }).click()

  // Assert
    await expect(page.getByTestId('order-result-id')).toBeVisible({ timeout: 10000 }) 
  //  await expect(page.getByTestId('order-result-id')).toContainText('VLO-9C6DL3')
    await page.getByTestId('order-result-id').click() 
    
    await expect(page.getByTestId('order-result-status')).toBeVisible() 
  //  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
    await page.getByTestId('order-result-status').click()

})

test('deve exibir mensagem de erro quando o pedido não for encontrado', async ({ page }) => {
  const orderNumber = 'VLO-ABC123'

  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('orderNumber')
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()
  
  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - img
    - heading "Pedido não encontrado" [level=3]
    - paragraph: Verifique o número do pedido e tente novamente
    `);
})