import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import { test as base, expect } from '@playwright/test'

import { BasePage } from '../../locators/pages'

/**
 * Follow guide https://medium.com/@lucgagan/mastering-playwright-best-practices-for-web-automation-with-the-page-object-model-3541412b03d1
 */
export class AppListPage extends BasePage {
  clickModalConfirmButton() {
    const modal = this.getModal()
    const button = this.getButton({ key: UiKey.ButtonConfirmation })

    return modal.locator(button).click()
  }

  async expectNoPreexistingApp() {
    await expect(this.getByExactText(this.appName)).toBeHidden()
  }

  async fillCreateAppForm() {
    await this.fillInputText({ label: 'Name' }, this.appName)

    await this.getModal()
      .locator(this.getButton({ text: 'Create App' }))
      .click()
  }

  async fillUpdateAppForm() {
    await this.fillInputText({ label: 'Name' }, this.updatedAppName)

    await this.getModal()
      .locator(this.getButton({ text: 'Update App' }))
      .click()

    await expect(this.getModal()).toBeHidden()
  }

  getAppName() {
    return this.getByExactText(this.appName)
  }

  getUpdatedAppName() {
    return this.getByExactText(this.updatedAppName)
  }

  async goto() {
    await this.page.goto(PageType.AppList())
  }

  async openCreateAppModal(key = UiKey.AppButtonOpenCreateForm) {
    await this.getButton({ key }).click()

    await expect(this.getModal()).toBeVisible()
  }

  async openCreateAppModalFromHeader() {
    await this.openCreateAppModal(UiKey.AppToolbarItemCreate)
  }

  async openDeleteAppModal() {
    const card = this.getCard({ name: this.updatedAppName })

    await card.locator(this.getButton({ label: 'More options' })).click()

    await this.getDropdownItem({ label: 'Delete' }).click()

    await expect(this.getModal()).toBeVisible()
  }

  async openUpdateAppModal() {
    const card = this.getCard({ name: this.appName })

    await card.locator(this.getButton({ label: 'More options' })).click()

    await this.getDropdownItem({ label: 'Edit' }).click()

    await expect(this.getModal()).toBeVisible()
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
