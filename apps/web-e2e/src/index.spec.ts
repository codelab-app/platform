import { getEnv } from '@codelab/shared/config'
import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')

  expect(
    await page.getByRole('link', { name: 'Jaegers' }).innerText(),
  ).toContain('Jaegers')
})
