import { test, expect } from '@playwright/test'

test.describe('App', () => {
  test('has title', async ({ page }) => {
    await page.goto('/apps')

    await page.waitForURL('/apps')

    expect(
      await page.getByRole('link', { name: 'Jaegers' }).innerText(),
    ).toContain('Jaegers')
  })
})
