import type { Locator, Page } from '@playwright/test'

import {
  getUiDataKey,
  getUiDataLabel,
  UiKey,
} from '@codelab/frontend/abstract/types'
import { CuiTestId } from '@codelab/frontend-application-shared-data'
import { expect } from '@playwright/test'

export interface CuiSelector {
  /**
   * Use this key to derive the label
   */
  key?: UiKey
  /**
   * Aria label
   */
  label?: string | RegExp
  /**
   * Text node
   */
  text?: string | RegExp
  /**
   * Title node
   */
  title?: string | RegExp
}

export class BasePage {
  /**
   * Use internally for chaining
   * For example in `getTree().getTreeItem()`, `getTree()` will set the locator to be chained in `getTreeItem()`
   */
  locator: Locator | undefined

  readonly page: Page

  public constructor(page: Page) {
    this.page = page
  }

  async checkPageHeaderTitle(items: Array<string>) {
    const pageHeaderClass = CuiTestId.cuiHeader()

    const titleBreadcrumb = this.page.locator(
      `.${pageHeaderClass} .ant-breadcrumb`,
    )

    for (const label of items) {
      await expect(titleBreadcrumb.getByText(label)).toBeVisible()
    }
  }

  /**
   *  Need specifier for pop
   */
  async clickPopconfirmButton(
    key:
      | UiKey.ElementPopconfirmFormDelete
      | UiKey.ElementPopconfirmOverlayDelete
      | UiKey.RedirectPopconfirmDelete,
  ) {
    const popconfirm = this.page.locator(`.ant-popconfirm.${getUiDataKey(key)}`)
    const confirmButton = popconfirm.locator('.ant-btn-primary')

    await expect(popconfirm).toBeVisible()

    await confirmButton.click()

    await expect(popconfirm).toBeHidden()
  }

  /**
   * Can take a while on CI, so add long timeout
   */
  async expectGlobalProgressBarToBeHidden() {
    await expect(this.getGlobalProgressBar()).toBeHidden({ timeout: 15000 })
  }

  async fillInputFilterSelect(
    options: { label: string | RegExp },
    value: string,
  ) {
    const page = this.locator ?? this.page

    // Fill
    await page.getByLabel(options.label).fill(value)

    // wait for dynamic dropdowns to populate options
    await expect(page.getByLabel('loading')).toHaveCount(0)

    // Then click on the first item in the dropdown, it's hoisted outside so we don't scope it to the previous locator
    await this.page
      .locator(
        '.ant-select-dropdown:not(.ant-select-dropdown-hidden) .ant-select-item',
      )
      .first()
      .click()

    await expect(
      this.page.locator(
        '.ant-select-dropdown:not(.ant-select-dropdown-hidden)',
      ),
    ).toBeHidden()
  }

  async fillInputMultiSelect(
    options: { name: string | RegExp },
    values: Array<number | string>,
  ) {
    const page = this.locator ?? this.page

    await page.locator(`.ant-select-multiple[name="${options.name}"]`).click()

    // wait for dynamic dropdowns to populate options
    await expect(page.getByLabel('loading')).toHaveCount(0)

    for (const value of values) {
      const option = this.page.locator(`.ant-select-item[title="${value}"]`)

      await this.page
        .locator(
          '.ant-select-dropdown:not(.ant-select-dropdown-hidden) .ant-select-item',
        )
        .first()
        .hover()

      await this.scrollUntilElementIsVisible(option)
      await option.click()
    }
  }

  async fillInputSelect(options: { label: string | RegExp }, value: string) {
    const page = this.locator ?? this.page
    const option = this.page.locator(`.ant-select-item[title="${value}"]`)

    await page.getByLabel(options.label).click()

    // wait for dynamic dropdowns to populate options
    await expect(page.getByLabel('loading')).toHaveCount(0)

    await this.page
      .locator(
        '.ant-select-dropdown:not(.ant-select-dropdown-hidden) .ant-select-item',
      )
      .first()
      .hover()

    await this.scrollUntilElementIsVisible(option)
    await option.click()
  }

  fillInputText(options: { label: string | RegExp }, value: string) {
    const page = this.locator ?? this.page

    return page.getByRole('textbox', { name: options.label }).fill(value)
  }

  /**
   * Locator chaining need to be passed in
   */
  getButton({ key, label, text, title }: CuiSelector, locator?: Locator) {
    const page = locator ?? this.page

    const getByLabel = (_label: string | RegExp) => {
      return page
        .getByRole('button')
        .and(page.getByLabel(_label, { exact: true }))
    }

    if (title) {
      return page
        .getByRole('button')
        .and(page.getByTitle(title, { exact: true }))
    }

    if (text) {
      return page.getByRole('button').filter({ hasText: text })
    }

    if (label) {
      return getByLabel(label)
    }

    /**
     * We want a `button` and match by `aria-label`
     */
    if (key) {
      const _label = getUiDataLabel(key)

      return getByLabel(_label)
    }

    return page.getByRole('button')
  }

  getByExactText(text: string | RegExp) {
    return this.page.getByText(text, { exact: true })
  }

  getCard(options: { name: string | RegExp }) {
    return this.page.locator('.ant-card', { hasText: options.name })
  }

  /**
   * Could be a modal or a popover
   */
  getDialog() {
    return this.page.getByRole('dialog')
  }

  getDropdownItem(options: { label: string | RegExp }) {
    return this.page
      .locator('.ant-dropdown')
      .locator(this.page.getByLabel(options.label))
  }

  getForm(key: UiKey) {
    const form = this.page.getByTestId(CuiTestId.cuiForm(key))

    this.locator = form

    return this
  }

  getGlobalProgressBar() {
    return this.page.getByRole('progressbar', {
      name: getUiDataLabel(UiKey.ProgressBarGlobal),
    })
  }

  getModalForm(key: UiKey) {
    const form = this.getDialog().locator('form')

    this.locator = form

    return this
  }

  getNotification() {
    return this.page.locator('.ant-notification')
  }

  getPopover(key: UiKey) {
    const popover = this.page.getByTestId(key)

    this.locator = popover

    return this
  }

  getSidebar(key: UiKey) {
    const sidebar = this.page.getByTestId(CuiTestId.cuiSidebar(key))

    this.locator = sidebar

    return this
  }

  getSkeleton() {
    return this.page.locator(`.${CuiTestId.cuiSkeleton()}:not(.hidden)`)
  }

  getSpinner() {
    return this.page.getByRole('status')
  }

  getToolbarItem(key: UiKey) {
    const page = this.locator ?? this.page

    return page.getByTestId(CuiTestId.cuiToolbarItem(key))
  }

  getTree() {
    const tree = this.page.getByTestId(CuiTestId.cuiTree())

    this.locator = tree

    return this
  }

  /**
   * Chain with `getTree` to get number of items
   */
  getTreeItem() {
    const page = this.locator ?? this.page
    const items = page.getByTestId(CuiTestId.cuiTreeItem())

    return items
  }

  getTreeItemByPrimaryTitle(label: string) {
    const page = this.locator ?? this.page

    const treeItem = page.getByTestId(CuiTestId.cuiTreeItem()).filter({
      has: this.page.getByTestId(CuiTestId.cuiTreeItemPrimaryTitle(label)),
    })

    this.locator = treeItem

    return this
  }

  getTreeItemByPrimaryTitle$(label: string) {
    const page = this.locator ?? this.page

    return page.getByTestId(CuiTestId.cuiTreeItem()).filter({
      has: this.page.getByTestId(CuiTestId.cuiTreeItemPrimaryTitle(label)),
    })
  }

  /**
   * Return this, if need to access locator, can do `getTreeItemBySecondaryTitle().locator`
   */
  getTreeItemBySecondaryTitle(label: string) {
    const page = this.page

    const treeItem = page.getByTestId(CuiTestId.cuiTreeItem()).filter({
      has: page.getByTestId(CuiTestId.cuiTreeItemSecondaryTitle(label)),
    })

    this.locator = treeItem

    return this
  }

  async openModal(options: CuiSelector) {
    await this.getButton(options).click()

    await expect(this.getDialog()).toBeVisible()
  }

  async scrollUntilElementIsVisible(locator: Locator) {
    while (!(await locator.isVisible())) {
      await this.page.mouse.wheel(0, 100)
    }
  }
}
