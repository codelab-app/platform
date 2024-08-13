import { expect, test } from '@playwright/test'

test('has Jaegers link', async ({ page }) => {
  await page.goto('/')

  expect(
    await page.getByRole('link', { name: 'Jaegers' }).innerText(),
  ).toContain('Jaegers')
})
