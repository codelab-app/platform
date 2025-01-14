import type { IAppDto } from '@codelab/shared/abstract/core'

import { providerPageId } from '@codelab/shared/data/test'
import { expect } from '@playwright/test'

import { getCuiTree } from '../../commands'
import { seedAppData } from '../builder/builder.data'
import { seedData } from './auth-guard.data'
import { test } from './auth-guard.fixture'

let app: IAppDto

test.describe.configure({ mode: 'serial' })

test.beforeAll(async ({ request }) => {
  app = await seedAppData(request)
  await seedData(request)
})

test.beforeEach(async ({ authGuardPage: page }) => {
  await page.goto()
  await page.checkPageHeaderTitle(['Auth Guards'])

  await expect(page.getSpinner()).toBeHidden()
})

test('should be able to create auth guard', async ({ authGuardPage: page }) => {
  await page.expectNoPreexistingGuards()
  await page.createAuthGuard()

  await expect(
    getCuiTree(page.page).getByText(page.authGuardName),
  ).toBeVisible()
})

test('should be able to create page auth guard redirect', async ({
  authGuardPage: page,
}) => {
  await page.goToAppPageList(app.id, providerPageId)
  await page.createPage()

  await expect(getCuiTree(page.page).getByText(page.pageName)).toBeVisible()

  await page.createAuthGuardRedirect()

  await expect(page.getModal()).toBeHidden()
  await expect(page.getNotification()).toContainText(
    'Auth redirect created successfully',
  )
  await expect(page.getPageRedirectIcon()).toBeVisible()
})

test('should be able to update page auth guard redirect', async ({
  authGuardPage: page,
}) => {
  await page.goToAppPageList(app.id, providerPageId)

  await page.updateAuthGuardRedirect()

  await expect(page.getModal()).toBeHidden()
  await expect(page.getNotification()).toContainText(
    'Auth redirect updated successfully',
  )
  await expect(page.getPageRedirectIcon()).toBeVisible()
})

test('should be able to delete page auth guard redirect', async ({
  authGuardPage: page,
}) => {
  await page.goToAppPageList(app.id, providerPageId)

  await expect(page.getPageRedirectIcon()).toBeVisible()

  await page.deleteAuthGuardRedirect()

  await expect(page.getModal()).toBeHidden()
  await expect(page.getPageRedirectIcon()).toBeHidden()
})

test('should be able to update auth guard', async ({ authGuardPage: page }) => {
  await page.updateAuthGuard()

  await expect(getCuiTree(page.page).getByText(page.authGuardName)).toBeHidden()
  await expect(
    getCuiTree(page.page).getByText(page.updatedAuthGuardName),
  ).toBeVisible()
})

test('should be able to delete auth guard', async ({ authGuardPage: page }) => {
  await page.deleteAuthGuard()

  await expect(getCuiTree(page.page).getByText(page.authGuardName)).toBeHidden()
  await expect(
    getCuiTree(page.page).getByText(page.updatedAuthGuardName),
  ).toBeHidden()
})
