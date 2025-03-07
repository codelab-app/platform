import type { Locator, Page } from '@playwright/test'

import {
  getUiDataKey,
  getUiDataLabel,
  UiKey,
} from '@codelab/frontend/abstract/types'
import { CuiTestId } from '@codelab/frontend-application-shared-data'
import test, { expect } from '@playwright/test'

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
      | UiKey.PageToolbarItemDelete
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

  async fillInputSelect(
    { label }: { label: string | RegExp },
    value: string,
    options?: {
      locator?: Locator
      waitForAutosave?: boolean
    },
  ) {
    return test.step('fillInputSelect', async () => {
      const page = options?.locator ?? this.locator ?? this.page

      // Fill
      // Input has `readonly` attribute, so we need to force fill
      await page.getByLabel(label).click()
      await page.getByLabel(label).fill(value, { force: true })

      // wait for dropdown to be visible
      const visibleDropdown = this.page
        .locator('.ant-select-dropdown:not(.ant-select-dropdown-hidden)')
        .filter({
          has: this.page
            .locator('.ant-select-item.ant-select-item-option')
            .filter({
              hasText: value,
            }),
        })

      await expect(visibleDropdown).toBeVisible()

      // Then click on the first item in the dropdown, it's hoisted outside so we don't scope it to the previous locator
      // Then click on the specific option with matching text
      await this.page
        .locator(
          '.ant-select-dropdown:not(.ant-select-dropdown-hidden) .ant-select-item.ant-select-item-option',
        )
        .filter({ hasText: value })
        .click()

      await expect(
        this.page.locator(
          '.ant-select-dropdown:not(.ant-select-dropdown-hidden)',
        ),
      ).toBeHidden()
    })
  }

  async fillInputText(
    { label }: { label: string | RegExp },
    value: string,
    options?: {
      locator?: Locator
      waitForAutosave?: boolean
    },
  ) {
    const page = options?.locator ?? this.locator ?? this.page

    await page.getByRole('textbox', { name: label }).fill(value)

    if (options?.waitForAutosave) {
      await this.waitForProgressBar()
    }
  }

  /**
   * Locator chaining need to be passed in
   */
  getButton(
    { key, label, text, title }: CuiSelector,
    options?: { locator?: Locator },
  ) {
    const page = options?.locator ?? this.locator ?? this.page

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

  getByLabel(label: string | RegExp) {
    const page = this.locator ?? this.page

    return page.getByLabel(label)
  }

  getCard(options: { name: string | RegExp }) {
    return this.page.locator('.ant-card', { hasText: options.name })
  }

  getCuiTree() {
    return this.page.getByTestId(CuiTestId.cuiTree())
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

  /**
   * Returns locator directly
   */
  getForm$(key: UiKey) {
    return this.page.getByTestId(CuiTestId.cuiForm(key))
  }

  getGlobalProgressBar() {
    return this.page.getByRole('progressbar', {
      name: getUiDataLabel(UiKey.ProgressBarGlobal),
    })
  }

  getModal(key: UiKey) {
    const modal = this.page.getByTestId(getUiDataKey(key))

    this.locator = modal

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
    return this.page.getByRole('status', { name: 'Loading' }).filter({
      // Need to ignore next.js toast
      hasNot: this.page.locator('.nextjs-toast'),
    })
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

  /**
   * Wait for progress bar to appear and then disappear, handling the race condition
   * between form autosave delay and progress bar visibility.
   */
  async waitForProgressBar() {
    return test.step('waitForProgressBar', async () => {
      // First, ensure we can detect the progress bar appearing
      await expect(async () => {
        const isVisible = this.getGlobalProgressBar()

        await expect(isVisible).toBeVisible({ timeout: 25 })
      }).toPass({
        // Use shorter polling intervals for better detection
        // Defaults to [100, 250, 500, 1000]
        intervals: [25, 50, 100, 250, 500, 1000],
        // Add reasonable timeout to prevent infinite waiting
        timeout: 10000,
      })

      // Then wait for it to disappear
      await expect(this.getGlobalProgressBar()).toBeHidden()
    })
  }
}
