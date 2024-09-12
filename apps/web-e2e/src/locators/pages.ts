import { UiDataRecord, type UiKey } from '@codelab/frontend/abstract/types'
import { Cui } from '@codelab/frontend-application-shared-data'
import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'

export interface CuiSelector {
  key?: UiKey
  /**
   * Aria label
   */
  label?: RegExp | string
  /**
   * Text node
   */
  text?: RegExp | string
}

export class BasePage {
  /**
   * Use this for chaining
   */
  locator: Locator | undefined

  readonly page: Page

  public constructor(page: Page) {
    this.page = page
  }

  /**
   * Can take a while on CI, so add long timeout
   */
  async expectGlobalProgressBarToBeHidden() {
    await expect(this.getGlobalProgressBar()).toBeHidden({ timeout: 15000 })
  }

  /**
   * Locator chaining need to be passed in
   */
  getButton(options: CuiSelector, locator?: Locator) {
    const page = locator ?? this.page

    if (options.text) {
      return page.getByRole('button').filter({ hasText: options.text })
    }

    if (options.label) {
      return page.getByRole('button', { name: options.label })
    }

    if (options.key) {
      const label = UiDataRecord[options.key].label

      return page.getByRole('button', { name: label })
    }

    return page.getByRole('button')
  }

  getByExactText(text: RegExp | string) {
    return this.page.getByText(text, { exact: true })
  }

  getCard(options: { name: RegExp | string }) {
    return this.page.locator('.ant-card', { hasText: options.name })
  }

  getDropdownItem(options: { label: RegExp | string }) {
    return this.page
      .locator('.ant-dropdown')
      .locator(this.page.getByLabel(options.label))
  }

  getGlobalProgressBar() {
    return this.page.getByRole('progressbar', {
      name: UiDataRecord.GlobalProgressBar.label,
    })
  }

  getModal() {
    return this.page.getByRole('dialog')
  }

  getModalForm(key: UiKey) {
    const form = this.getModal().locator('form')

    this.locator = form

    return this
  }

  getNotification() {
    return this.page.locator('.ant-notification')
  }

  getSidebar(key: UiKey) {
    const sidebar = this.page.getByTestId(Cui.cuiSidebar(key))

    this.locator = sidebar

    return this
  }

  getTextBox(options: { label: RegExp | string }) {
    return this.page.getByRole('textbox', { name: options.label })
  }

  // getToolbarItem(key: UiKey) {
  //   return this.page.getByTestId(Cui.cuiToolbarItem(key))
  // }

  getToolbarItem(key: UiKey) {
    const page = this.locator ?? this.page

    return page.getByTestId(Cui.cuiToolbarItem(key))
  }

  getTreeItem(label: string) {
    return this.page.getByTestId(Cui.cuiTreeItemPrimaryTitle(label))
  }

  async openModal(options: CuiSelector) {
    await this.getButton(options).click()

    await expect(this.getModal()).toBeVisible()
  }
}
