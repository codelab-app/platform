import { IPageKindName } from '@codelab/shared/abstract/core'
import { expect, test } from '@playwright/test'
import {
  getButton,
  getCard,
  getCuiTreeItemByPrimaryTitle,
  getDropdownItem,
  getModal,
  getModalAction,
  setFormFieldValue,
} from './commands'

export const pageName = 'New Page'

export const updatedPageName = 'Updated Page'

export const appName = 'New App'

export const updatedAppName = 'Updated App'

test.describe('Apps CRUD', () => {
  test.describe('create', () => {
    test('should be able to create app', async ({ page }) => {
      await page.goto('/apps')

      // check that we don't have app with test-name
      await expect(page.getByText(appName, { exact: true })).not.toBeVisible({
        timeout: 0,
      })

      await (await getButton(page, { label: /Create Now/ })).click()

      const modal = await getModal(page)

      await setFormFieldValue(page, { label: 'Name', value: appName })

      await (await getModalAction(modal, /Create App/)).click()

      await expect(modal).toBeHidden()
      await expect(page.getByText(appName)).toBeVisible()
    })

    test('should create _app, 404, and 500 page for the app', async ({
      page,
    }) => {
      await page.getByText(appName).click()

      await expect(
        await getCuiTreeItemByPrimaryTitle(page, IPageKindName.Provider),
      ).toBeVisible()
      await expect(
        await getCuiTreeItemByPrimaryTitle(page, IPageKindName.NotFound),
      ).toBeVisible()
      await expect(
        await getCuiTreeItemByPrimaryTitle(
          page,
          IPageKindName.InternalServerError,
        ),
      ).toBeVisible()
    })
  })

  test.describe('update', () => {
    test('should be able to update app name', async ({ page }) => {
      await page.goto('/apps')

      const card = await getCard(page, { title: appName })

      await card.getByRole('button', { name: 'ellipsis' }).click()

      await (await getDropdownItem(page, 'Edit')).click()

      const modal = await getModal(page)

      await setFormFieldValue(page, { label: 'Name', value: updatedAppName })

      await (await getModalAction(modal, /Update App/)).click()

      await expect(modal).toBeHidden()
      await expect(page.getByText(appName)).toBeHidden()
      await expect(page.getByText(updatedAppName)).toBeVisible()
    })
  })

  test.describe('delete', () => {
    test('should be able to delete app', async ({ page }) => {
      const card = await getCard(page, { title: updatedAppName })

      await card.getByRole('button', { name: 'ellipsis' }).click()

      await (await getDropdownItem(page, 'Delete')).click()

      const modal = await getModal(page)

      await (await getModalAction(modal, /Delete App/)).click()

      await expect(modal).toBeHidden()
      await expect(page.getByText(updatedAppName)).toBeHidden()
    })
  })
})
