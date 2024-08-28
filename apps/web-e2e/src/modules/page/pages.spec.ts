import { UiKey } from '@codelab/frontend/abstract/types'
import { expect } from '@playwright/test'
import { test } from './page.fixture'

test.describe.configure({ mode: 'serial' })

test.beforeAll(async ({ pageListPage: page }) => {
  await page.seedApp()
})

test('should be able to create page', async ({ pageListPage: page }) => {
  await page.expectSystemPagesToExist()

  await page.expectNoPreexistingPage()

  // await page
  //   .getSidebar(UiKey.PageSidebar)
  //   .locator(page.getToolbarItem(UiKey.CreatePageToolbarItem))
  //   .click()

  await page
    .getSidebar(UiKey.PageSidebar)
    .getToolbarItem(UiKey.CreatePageToolbarItem)
    .click()

  await page
    .getModalForm(UiKey.CreatePageForm)
    .page.getByLabel('Name')
    .fill(page.pageName)

  await expect(page.getGlobalProgressBar()).toBeHidden()
  await expect(page.getTreeItem(page.pageName)).toBeVisible()

  test('should have accessible page link on sidebar', async () => {
    await page.getTreeItem(page.pageName).click()
  })
})

test('should be able to update page name', async ({ pageListPage: page }) => {
  //
})

test('should be able to delete page', async ({ pageListPage: page }) => {
  //
})
