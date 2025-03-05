import { expect } from '@playwright/test'

import { test } from './home.fixture'

test.describe.configure({ mode: 'serial' })

test('has Jaegers link', async ({ homePage: page }) => {
  await page.page.goto('/')

  // expect(
  //   await page.getByRole('link', { name: 'Jaegers' }).innerText(),
  // ).toContain('Jaegers')

  const modal = page.getDialog()
  // const button = page.page.getByRole('button')
  const button = modal.locator(page.getButton({}))

  console.log(button)

  await expect(modal).toBeVisible()
  await expect(button).toBeVisible()
})
