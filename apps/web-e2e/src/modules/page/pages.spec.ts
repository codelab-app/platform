import type { IAppDto } from '@codelab/shared/abstract/core'

import { providerPageId } from '@codelab/shared/data/test'
import { expect } from '@playwright/test'

import { getCuiTree, getTimestamp, logTimestamp } from '../../commands'
import { globalBeforeAll } from '../../setup/before-all'
import { seedAppData } from '../builder/builder.data'
import { test } from './page.fixture'

let app: IAppDto

test.describe.configure({ mode: 'serial' })

globalBeforeAll()

test.beforeAll(async ({ request }) => {
  app = await seedAppData(request)
})

test.beforeEach(async ({ pageListPage: page }, testInfo) => {
  await page.goto(app.id, providerPageId)
  await page.checkPageHeaderTitle(['Codelab App', 'Pages', 'provider'])

  await expect(page.getSpinner()).toBeHidden()
})

test('should be able to create page', async ({ pageListPage: page }) => {
  logTimestamp('Starting create page')
  await page.expectSystemPagesToExist()
  await page.expectNoPreexistingPage()
  await page.createPage()

  await expect(getCuiTree(page.page).getByText(page.pageName)).toBeVisible()
})

test('should be able to update page name', async ({ pageListPage: page }) => {
  logTimestamp('Starting update page')
  await page.updatePage()

  await expect(getCuiTree(page.page).getByText(page.pageName)).toBeHidden()
  await expect(
    getCuiTree(page.page).getByText(page.updatedPageName),
  ).toBeVisible()
})

test('should be able to delete page', async ({ pageListPage: page }) => {
  await page.deletePage()

  await expect(getCuiTree(page.page).getByText(page.pageName)).toBeHidden()
  await expect(
    getCuiTree(page.page).getByText(page.updatedPageName),
  ).toBeHidden()
})
