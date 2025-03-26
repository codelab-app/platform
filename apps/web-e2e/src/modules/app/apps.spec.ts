import { expect } from '@playwright/test'

import { globalBeforeAll } from '../../setup/before-all'
import { test } from './app.fixture'

test.describe.configure({ mode: 'serial' })

globalBeforeAll()

test.beforeEach(async ({ appListPage: page }) => {
  await page.gotoAppListUrl()

  await expect(page.getSpinner()).toBeHidden()
})

test('should be able to create app', async ({ appListPage: page }) => {
  await page.expectNoPreexistingApp()

  await page.openCreateAppModal()

  await page.fillCreateAppForm()

  await page.expectGlobalProgressBarToBeHidden()

  // This may close before route is changed
  await page.expectNotificationSuccess('App created successfully')

  await expect(page.getDialog()).toBeHidden()

  await expect(page.getAppName()).toBeVisible()
})

test('should notify error when app with duplicated name created', async ({
  appListPage: page,
}) => {
  await page.openCreateAppModalFromHeader()

  await page.fillCreateAppForm()

  await page.expectGlobalProgressBarToBeHidden()

  await expect(page.getDialog()).toBeVisible()

  await page.expectNotificationError('Error while creating app')

  await expect(page.getAppName()).toHaveCount(1)
})

test('should be able to update app name', async ({ appListPage: page }) => {
  await page.openUpdateAppModal()

  await page.fillUpdateAppForm()

  await page.expectGlobalProgressBarToBeHidden()

  await page.expectNotificationSuccess('App updated successfully')

  await expect(page.getUpdatedAppName()).toBeVisible()
})

test('should be able to delete app', async ({ appListPage: page }) => {
  await page.openDeleteAppModal()

  await page.clickModalConfirmButton()

  await page.expectGlobalProgressBarToBeHidden()

  await page.expectNotificationSuccess('App deleted successfully')

  await expect(page.getUpdatedAppName()).toBeHidden()
})
