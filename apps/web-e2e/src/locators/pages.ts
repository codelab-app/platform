import {
  PageType,
  UiDataRecord,
  type UiKey,
} from '@codelab/frontend/abstract/types'
import { assertContainsAtLeastOne } from '@codelab/shared/utils'
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
  readonly page: Page

  public constructor(page: Page) {
    this.page = page
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
    return this.page.getByRole('article', { name: options.name })
  }

  getDropdownItem(options: { label: RegExp | string }) {
    return this.page
      .locator('.ant-dropdown')
      .locator(this.page.getByLabel(options.label))
  }

  getModal() {
    return this.page.getByRole('dialog')
  }

  getTextBox(options: { label: RegExp | string }) {
    return this.page.getByRole('textbox', { name: options.label })
  }

  async openModal(options: CuiSelector) {
    await this.getButton(options).click()

    await expect(this.getModal()).toBeVisible()
  }
}
