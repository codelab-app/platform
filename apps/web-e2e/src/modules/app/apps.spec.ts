import { expect } from '@playwright/test'

import { test } from './app.fixture'

test.describe.configure({ mode: 'serial' })

test.beforeEach(async ({ appListPage: page }) => {
  await page.goto()

  await expect(page.getSpinner()).toBeHidden()
})

test('should be able to create app', async ({ appListPage: page }) => {
  await page.expectNoPreexistingApp()

  await page.openCreateAppModal()

  await page.fillCreateAppForm()

  await page.expectGlobalProgressBarToBeHidden()

  await expect(page.getModal()).toBeHidden()
  await expect(page.getNotification()).toContainText('App created successfully')
  await expect(page.getAppName()).toBeVisible()
})

test('should notify error when app with duplicated name created', async ({
  appListPage: page,
}) => {
  await page.openCreateAppModalFromHeader()

  await page.fillCreateAppForm()

  await page.expectGlobalProgressBarToBeHidden()

  await expect(page.getModal()).toBeVisible()
  await expect(page.getNotification()).toContainText('Error while creating app')
  await expect(page.getAppName()).toHaveCount(1)
})

test('should be able to update app name', async ({ appListPage: page }) => {
  await page.openUpdateAppModal()

  await page.fillUpdateAppForm()

  await page.expectGlobalProgressBarToBeHidden()

  await expect(page.getNotification()).toContainText('App updated successfully')
  await expect(page.getUpdatedAppName()).toBeVisible()
})

test('should be able to delete app', async ({ appListPage: page }) => {
  await page.openDeleteAppModal()

  await page.clickModalConfirmButton()

  await page.expectGlobalProgressBarToBeHidden()

  await expect(page.getNotification()).toContainText('App deleted successfully')
  await expect(page.getUpdatedAppName()).toBeHidden()
})

// to provide clean environment for test re-run, in case
// something goes wrong somewhere in the middle of test suit
test.afterAll('cleanup created app', async ({ request }) => {
  await request.post('/api/v1/admin/setup-e2e-data')
})
