import { test, expect } from '@playwright/test'
import { auth0Password, auth0Username } from '../../playwright.config'

const authFile = 'playwright/.auth/user.json'

test('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('/apps')
  await page.getByLabel('Email address*').fill(auth0Username)
  await page.getByLabel('Password*').fill(auth0Password)
  await page.getByRole('button', { name: 'Continue' }).click()
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://github.com/')

  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(
    page.getByRole('button', { name: 'View profile and more' }),
  ).toBeVisible()

  // End of authentication steps.
  await page.context().storageState({ path: authFile })
})
