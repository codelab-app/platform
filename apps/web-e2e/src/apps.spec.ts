import { expect, test } from '@playwright/test'
import { AppListPage } from './pages'

export const pageName = 'New Page'
export const updatedPageName = 'Updated Page'
export const appName = 'New App'
export const updatedAppName = 'Updated App'

let appListPage: AppListPage

test.beforeEach(async ({ page }) => {
  appListPage = new AppListPage(page)

  await appListPage.goto()
})

test.describe('Apps CRUD', () => {
  test.describe('create', () => {
    test('should be able to create app', async ({ page }) => {
      await appListPage.onLoad()

      await appListPage.openCreateAppModal()

      await appListPage.fillCreateAppForm()

      await expect(appListPage.getAppName()).toBeVisible()
    })
  })

  test.describe('update', () => {
    test('should be able to update app name', async ({ page }) => {
      // Click the options button on the card
      await page.getByRole('button', { name: 'ellipsis' }).click()
      await page.getByText('Edit').click()

      // Update the app name
      await page.getByLabel('Name').fill(updatedAppName)
      await page.getByRole('button', { name: 'Update App' }).click()

      // Check the update result
      await expect(page.getByText(appName)).toBeHidden()
      await expect(page.getByText(updatedAppName)).toBeVisible()
    })
  })

  test.describe('delete', () => {
    test('should be able to delete app', async ({ page }) => {
      // Click the options button on the card
      await page.getByRole('button', { name: 'ellipsis' }).click()
      await page.getByText('Delete').click()

      // Confirm deletion
      await page.getByRole('button', { name: 'Delete App' }).click()

      // Check the deletion result
      await expect(page.getByText(updatedAppName)).toBeHidden()
    })
  })
})
