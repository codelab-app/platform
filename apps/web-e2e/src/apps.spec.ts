import { expect, test } from '@playwright/test'
import { AppListPage } from './pages'

export const pageName = 'New Page'

export const updatedPageName = 'Updated Page'

export const appName = 'New App'

export const updatedAppName = 'Updated App'

test.describe('Apps CRUD', () => {
  test.describe('create', () => {
    test('should be able to create app', async ({ page }) => {
      const appListPage = new AppListPage(page)

      await appListPage.goto()

      await appListPage.onLoad()

      await appListPage.openCreateAppModal()

      await appListPage.fillCreateAppForm()

      await expect(appListPage.getAppName()).toBeVisible()
    })
  })
})
