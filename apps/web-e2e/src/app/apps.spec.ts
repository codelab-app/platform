import { expect } from '@playwright/test'
import { test } from './app.fixture'

test.describe.configure({ mode: 'serial' })

test.beforeEach(async ({ appListPage: page }) => {
  await page.goto()
})

test('should be able to create app', async ({ appListPage: page }) => {
  await page.expectNoPreexistingApp()

  await page.openCreateAppModal()

  // const responsePromise = page.page.waitForResponse('/apps')

  await page.fillCreateAppForm()

  // await responsePromise

  await expect(page.getAppName()).toBeVisible()
})

test('should be able to update app name', async ({ appListPage: page }) => {
  await page.openUpdateAppModal()

  await page.fillUpdateAppForm()

  await expect(page.getUpdatedAppName()).toBeVisible()
})

test('should be able to delete app', async ({ appListPage: page }) => {
  await page.openDeleteAppModal()

  await page.clickModalConfirmButton()

  await expect(page.getUpdatedAppName()).toBeHidden()
})
