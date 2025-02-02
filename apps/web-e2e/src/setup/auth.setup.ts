import { expect, test } from '@playwright/test'

import { auth0Password, auth0Username, authFile } from '../../playwright.config'

test('authenticate', async ({ page }) => {
  // navigate to login page
  await page.goto('/auth/login?returnTo=%2F')

  // fill login form
  await page.getByLabel('Email address').fill(auth0Username)
  await page.getByLabel('Password').fill(auth0Password)
  await page.getByRole('button', { exact: true, name: 'Continue' }).click()

  // after login user will be redirected to /
  await page.waitForURL('/')

  await expect(
    page.getByRole('link', { exact: true, name: 'Log Out' }),
  ).toBeVisible()

  // End of authentication steps.
  await page.context().storageState({ path: authFile })
})
