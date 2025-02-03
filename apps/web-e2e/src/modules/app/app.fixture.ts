import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import { test as base, expect } from '@playwright/test'

import { BasePage } from '../../locators/pages'

/**
 * Follow guide https://medium.com/@lucgagan/mastering-playwright-best-practices-for-web-automation-with-the-page-object-model-3541412b03d1
 */
export class AppListPage extends BasePage {
  async clickModalConfirmButton() {
    return test.step('clickModalConfirmButton', async () => {
      const modal = this.getDialog()
      const button = this.getButton({ key: UiKey.ButtonConfirmation })

      return modal.locator(button).click()
    })
  }

  async expectNoPreexistingApp() {
    return test.step('expectNoPreexistingApp', async () => {
      await expect(this.getByExactText(this.appName)).toBeHidden()
    })
  }

  async fillCreateAppForm() {
    return test.step('fillCreateAppForm', async () => {
      await this.fillInputText({ label: 'Name' }, this.appName)
      await this.getDialog()
        .locator(this.getButton({ text: 'Create App' }))
        .click()
    })
  }

  async fillUpdateAppForm() {
    return test.step('fillUpdateAppForm', async () => {
      await this.fillInputText({ label: 'Name' }, this.updatedAppName)
      await this.getDialog()
        .locator(this.getButton({ text: 'Update App' }))
        .click()
      await expect(this.getDialog()).toBeHidden()
    })
  }

  getAppName() {
    return this.getByExactText(this.appName)
  }

  getUpdatedAppName() {
    return this.getByExactText(this.updatedAppName)
  }

  async gotoAppListUrl() {
    return test.step('goto', async () => {
      await this.page.goto(PageType.AppList())
    })
  }

  async openCreateAppModal(key = UiKey.AppButtonOpenCreateForm) {
    return test.step('openCreateAppModal', async () => {
      await this.getButton({ key }).click()
      await expect(this.getDialog()).toBeVisible()
    })
  }

  async openCreateAppModalFromHeader() {
    return test.step('openCreateAppModalFromHeader', async () => {
      await this.openCreateAppModal(UiKey.AppToolbarItemCreate)
    })
  }

  async openDeleteAppModal() {
    return test.step('openDeleteAppModal', async () => {
      const card = this.getCard({ name: this.updatedAppName })

      await card.locator(this.getButton({ label: 'More options' })).click()
      await this.getDropdownItem({ label: 'Delete' }).click()
      await expect(this.getDialog()).toBeVisible()
    })
  }

  async openUpdateAppModal() {
    return test.step('openUpdateAppModal', async () => {
      const card = this.getCard({ name: this.appName })

      await card.locator(this.getButton({ label: 'More options' })).click()
      await this.getDropdownItem({ label: 'Edit' }).click()
      await expect(this.getDialog()).toBeVisible()
    })
  }

  private readonly appName = 'New App'

  private readonly updatedAppName = 'Updated App'
}

export const test = base.extend<{ appListPage: AppListPage }>({
  appListPage: async ({ page }, use) => {
    const appListPage = new AppListPage(page)

    await use(appListPage)
  },
})
