import { test, expect } from '@playwright/test';
test('app loads and shows header', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText(/ChatPay v6.3.0|ChatPay v6.4.0/)).toBeVisible();
  await expect(page.getByText('Dashboard')).toBeVisible();
});
