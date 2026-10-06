import { test, expect } from '@playwright/test';

test('página de login responde', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/login/i);
});
