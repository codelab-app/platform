import type { IAppDto } from '@codelab/shared-abstract-core'

import { expect } from '@playwright/test'
import { merge } from 'remeda'

import { globalBeforeAll } from '../../setup/before-all'
import { seedAppData } from '../app/app.data'
import { seedPageData } from '../page/page.data'
import { seedResourceData } from './auth-guard.data'
import { authGuardPageData, test } from './auth-guard.fixture'

let app: IAppDto

test.describe.configure({ mode: 'serial' })

globalBeforeAll()

test.beforeAll(async ({ request }, testInfo) => {
  app = await seedAppData(request, { atomTypes: [], componentTypes: [] })

  await seedPageData(request, merge(authGuardPageData, { app }))
  await seedResourceData(request)
})

test.beforeEach(async ({ authGuardPage: page }) => {
  await page.goto()
  await page.checkPageHeaderTitle(['Auth Guards'])

  await expect(page.getSpinner()).toBeHidden()
})

test('should be able to create auth guard', async ({ authGuardPage: page }) => {
  await page.expectNoPreexistingGuards()
  await page.createAuthGuard()

  await expect(page.getCuiTree().getByText(page.authGuardName)).toBeVisible()
})

test('should be able to create page auth guard redirect', async ({
  authGuardPage: page,
}) => {
  await page.goToAppPageList(app.id, authGuardPageData.id)

  await expect(
    page.getCuiTree().getByText(authGuardPageData.name),
  ).toBeVisible()

  await page.createAuthGuardRedirect()

  await expect(page.getDialog()).toBeHidden()

  await page.expectNotificationSuccess('Auth redirect created successfully')

  await expect(await page.getPageRedirectIcon()).toBeVisible()
})

test('should be able to update page auth guard redirect', async ({
  authGuardPage: page,
}) => {
  await page.goToAppPageList(app.id, authGuardPageData.id)

  await page.updateAuthGuardRedirect()

  await expect(page.getDialog()).toBeHidden()

  await page.expectNotificationSuccess('Auth redirect updated successfully')

  await expect(await page.getPageRedirectIcon()).toBeVisible()
})

test('should be able to delete page auth guard redirect', async ({
  authGuardPage: page,
}) => {
  await page.goToAppPageList(app.id, authGuardPageData.id)

  await expect(await page.getPageRedirectIcon()).toBeVisible()

  await page.deleteAuthGuardRedirect()

  await expect(page.getDialog()).toBeHidden()
  await expect(await page.getPageRedirectIcon()).toBeHidden()
})

test('should be able to update auth guard', async ({ authGuardPage: page }) => {
  await page.updateAuthGuard()

  await expect(page.getCuiTree().getByText(page.authGuardName)).toBeHidden()
  await expect(
    page.getCuiTree().getByText(page.updatedAuthGuardName),
  ).toBeVisible()
})

test('should be able to delete auth guard', async ({ authGuardPage: page }) => {
  await page.deleteAuthGuard()

  await expect(page.getCuiTree().getByText(page.authGuardName)).toBeHidden()
  await expect(
    page.getCuiTree().getByText(page.updatedAuthGuardName),
  ).toBeHidden()
})
