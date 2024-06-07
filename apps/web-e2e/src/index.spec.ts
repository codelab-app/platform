import { getEnv } from '@codelab/shared/config'
import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')

  expect(
    await page.getByRole('link', { name: 'Jaegers' }).innerText(),
  ).toContain('Jaegers')
})

test.describe('Login with Auth0', () => {
  test('can login', async ({ page }) => {
    await page.goto('/')

    await page.getByTestId('auth0-login-link').click()
    await page.waitForURL('https://codelab-app-test.us.auth0.com/*')

    // await page.waitForURL(`${getEnv().auth0.domain}/*`)

    const form = await page.getByTestId('login-form')
    const usernameField = await form.getByLabel('Username')
    const passwordField = await form.getByLabel('Password')

    await expect(usernameField).toBeDefined()
    await expect(passwordField).toBeDefined()
  })
})
