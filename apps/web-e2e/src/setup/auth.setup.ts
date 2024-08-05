import { expect, test } from '@playwright/test'
import { auth0Password, auth0Username } from '../../playwright.config'

const authFile = 'playwright/.auth/user.json'

test('authenticate', async ({ page }) => {
  // navigate to login page
  await page.goto('/api/auth/login')

  // fill login form
  await page.getByLabel('Email address*').fill(auth0Username)
  await page.getByLabel('Password*').fill(auth0Password)
  await page.getByRole('button', { exact: true, name: 'Continue' }).click()

  // after login user will be redirected to /apps
  await page.waitForURL('/apps')
  // go back to landing page
  await page.goto('/')

  await expect(
    page.getByRole('link', { exact: true, name: 'Log Out' }),
  ).toBeVisible()

  // End of authentication steps.
  await page.context().storageState({ path: authFile })
})
