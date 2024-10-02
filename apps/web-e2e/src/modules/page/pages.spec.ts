import { UiKey } from '@codelab/frontend/abstract/types'
import { expect } from '@playwright/test'

import { test } from './page.fixture'

test.describe.configure({ mode: 'serial' })

test.beforeAll(async ({ pageListPage: page }) => {
  await page.seedApp()
})

test.skip('should be able to create page', async ({ pageListPage: page }) => {
  await page.expectSystemPagesToExist()

  await page.expectNoPreexistingPage()

  // await page
  //   .getSidebar(UiKey.PageSidebar)
  //   .locator(page.getToolbarItem(UiKey.PageToolbarItemCreate))
  //   .click()

  await page
    .getSidebar(UiKey.PageSidebar)
    .getToolbarItem(UiKey.PageToolbarItemCreate)
    .click()

  await page
    .getModalForm(UiKey.PageFormCreate)
    .page.getByLabel('Name')
    .fill(page.pageName)

  await page.expectGlobalProgressBarToBeHidden()

  await expect(page.getTreeItemByPrimaryTitle(page.pageName)).toBeVisible()

  test('should have accessible page link on sidebar', async () => {
    await page.getTreeItemByPrimaryTitle(page.pageName).click()
  })
})

test.skip('should be able to update page name', async ({
  pageListPage: page,
}) => {
  //
})

test.skip('should be able to delete page', async ({ pageListPage: page }) => {
  //
})
