import type { ICreateCypressElementData } from '@codelab/shared/abstract/core'
import type { Locator } from '@playwright/test'

import {
  PageType,
  PrimarySidebar,
  UiKey,
} from '@codelab/frontend/abstract/types'
import { CuiTestId } from '@codelab/frontend-application-shared-data'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { test as base, expect } from '@playwright/test'

import { setFormFieldValue } from '../../commands'
import { BasePage } from '../../locators/pages'

/**
 * Follow guide https://medium.com/@lucgagan/mastering-playwright-best-practices-for-web-automation-with-the-page-object-model-3541412b03d1
 */
export class BuilderPage extends BasePage {
  async checkBuilderIsUpdated() {
    await expect(
      this.getTreeElement('Button Updated', 'AntDesignButton'),
    ).toBeVisible()
  }

  async checkBuilderOutput() {
    const outputContainer = this.getBuilderRenderContainer()
    const antDesignRow = outputContainer.locator('.ant-row')

    await expect(antDesignRow).toBeVisible()

    const antDesignCols = antDesignRow.locator('.ant-col')
    const firstColEmpty = antDesignCols.nth(0)
    const secondColButton = antDesignCols.nth(1).locator('.ant-btn')
    const thirdColTypography = antDesignCols.nth(2).locator('.ant-typography')

    await expect(antDesignCols).toHaveCount(3)
    await expect(firstColEmpty).toBeEmpty()
    await expect(secondColButton).toContainText('Click Me!')
    await expect(thirdColTypography).toContainText('Ant Design Text Element')
  }

  async checkElementTreeStructure(expectedTreeElements: Array<string>) {
    const elementsTree = this.getElementsTree()
    const treeElements = elementsTree.locator('.ant-tree-treenode')

    for (let i = 0; i < expectedTreeElements.length; i++) {
      await expect(treeElements.nth(i + 1)).toContainText(
        expectedTreeElements[i]!,
      )

      if (await this.page.getByLabel('plus-square').isVisible()) {
        await this.page.getByLabel('plus-square').click()
      }
    }
  }

  async checkRootElementExists() {
    const explorerTree = this.getElementsTree()

    await expect(explorerTree).toBeVisible()
    await expect(
      this.getTreeElement(ROOT_ELEMENT_NAME, 'ReactFragment'),
    ).toBeVisible()
  }

  async clickModalConfirmButton() {
    const modal = this.getModal()
    const button = this.getButton({ key: UiKey.ButtonConfirmation })

    await expect(this.getModal()).toBeVisible()

    await modal.locator(button).click()
  }

  async createElementTree(elements: Array<ICreateCypressElementData>) {
    const explorerTree = this.getElementsTree()
    const itemToolbarKey = CuiTestId.cuiTreeItemToolbar()

    for (const element of elements) {
      const { atom, name, propsData } = element
      const parentElement = explorerTree.getByTitle(element.parentElement)
      const parentElementToolbar = parentElement.getByTestId(itemToolbarKey)
      const submitButton = this.getButton({ text: 'Create' })
      const modal = this.getModalForm(UiKey.ElementPopoverCreate)

      await parentElement.click()
      await expect(parentElement).toHaveClass(/ant-tree-node-selected/)
      await expect(this.getFormFieldSpinner()).toHaveCount(0)

      await parentElementToolbar.getByLabel('plus').click()

      await expect(this.getFormFieldSpinner()).toHaveCount(0)
      await expect(modal.locator!.getByLabel('Name')).toHaveValue(
        'React Fragment',
      )

      await this.setFormFieldValue('Name', name)
      await this.setFormFieldValue('Render Type', atom)

      if (propsData) {
        await this.setFormFieldValue('Props Data', propsData)
      }

      await this.getModal().locator(submitButton).click()

      await expect(this.getModal()).toBeHidden()
      await expect(this.getTreeElement(name, atom)).toBeVisible()
    }
  }

  async deleteElementByContextMenu(element: ICreateCypressElementData) {
    const treeElement = await this.selectTreeElement(element)

    await treeElement.click({ button: 'right' })
    await this.page.getByText(`Delete \`${element.name}\``).click()
    await this.clickModalConfirmButton()

    await expect(this.getGlobalProgressBar()).toBeHidden()
    await expect(this.getNotification()).toHaveText('Element deleted')
    await expect(treeElement).toBeHidden()
  }

  async deleteElementFromOverlay(element: ICreateCypressElementData) {
    const elementOverlay = this.getElementOverlay()
    const deleteElementButton = elementOverlay.locator('.anticon-delete')

    await this.selectTreeElement(element)
    await deleteElementButton.click()
    await this.clickModalConfirmButton()

    await expect(this.getGlobalProgressBar()).toBeHidden()
  }

  async deleteElementFromUpdateForm(element: ICreateCypressElementData) {
    await this.selectTreeElement(element)
    await this.page.getByLabel('Delete').click()
    await this.clickModalConfirmButton()

    await expect(this.getGlobalProgressBar()).toBeHidden()
  }

  getBuilderRenderContainer() {
    return this.page.locator('#render-root')
  }

  getElementOverlay() {
    return this.page.locator('#builder-click-overlay')
  }

  getElementsTree() {
    const explorerTreeTestId = CuiTestId.cuiSidebarViewContent('Elements Tree')

    return this.page.getByTestId(explorerTreeTestId)
  }

  getFormFieldSpinner() {
    return this.page.getByLabel('loading')
  }

  getSelectedTreeElement() {
    return this.page.locator('.ant-tree-treenode-selected')
  }

  getSpinner() {
    return this.page.getByRole('status')
  }

  getStateAccordion() {
    return this.page.getByTestId('cui-sidebar-view-header-State')
  }

  getTextEditorInput() {
    const editorContainer = this.page.locator('#lexical-editor')
    const editor = editorContainer.locator('.editor-input.active')

    return editor
  }

  getToggleTextEditorButton() {
    return this.getElementOverlay().getByLabel('Toggle Content Editing')
  }

  getTreeElement(name: string, type?: string) {
    return this.page
      .getByTitle(`${name} (${type ?? name})`)
      .or(this.page.getByTitle(`${name} (instance of ${type ?? name})`))
  }

  getUpdateElementForm() {
    return this.page.getByTestId('cui-form-update-element-form')
  }

  async goto(appId: string, pageId: string) {
    await this.page.goto(
      PageType.PageBuilder({ appId, pageId }, PrimarySidebar.ElementTree),
    )
  }

  async openBuilder() {
    const openPreviewButton = this.page.getByTestId(
      'cui-toolbar-item-open-preview-builder-toolbar-item',
    )

    const openBuilderButton = this.page.getByTestId(
      'cui-toolbar-item-open-builder-builder-toolbar-item',
    )

    await openBuilderButton.click()

    // await this.page.waitForURL(PageType.ComponentBuilder({ componentId: '**' }))

    await expect(openBuilderButton).toBeHidden()
    await expect(openPreviewButton).toBeVisible()
  }

  async openPreview() {
    const openPreviewButton = this.page.getByTestId(
      'cui-toolbar-item-open-preview-builder-toolbar-item',
    )

    const openBuilderButton = this.page.getByTestId(
      'cui-toolbar-item-open-builder-builder-toolbar-item',
    )

    await openPreviewButton.click()

    // await this.page.waitForURL(PageType.ComponentBuilder({ componentId: '**' }))

    await expect(openPreviewButton).toBeHidden()
    await expect(openBuilderButton).toBeVisible()
  }

  async openPropsTab() {
    const cssTab = this.page.locator('[data-node-key="Props"]')

    await cssTab.click()

    await expect(cssTab).toHaveClass('ant-tabs-tab ant-tabs-tab-active')
    await expect(this.getSpinner()).toBeHidden()
  }

  async selectTreeElement(
    element: Pick<ICreateCypressElementData, 'atom' | 'name'>,
  ) {
    const { atom, name } = element
    const treeElement = this.getTreeElement(name, atom)
    const selectedTreeElement = this.getSelectedTreeElement()

    await treeElement.click()

    await expect(selectedTreeElement).toHaveText(
      new RegExp(`^(${name}${atom}|${name}instance of ${atom})$`),
    )
    await expect(this.getFormFieldSpinner()).toHaveCount(0)

    return treeElement
  }

  async setFormFieldValue(label: string, value: string, locator?: Locator) {
    await setFormFieldValue(locator ?? this.locator!, { label, value })
  }

  async updateBuilderElement() {
    const buttonTreeElement = this.getTreeElement('Button', 'AntDesignButton')
    const updateElementForm = this.getUpdateElementForm()

    await buttonTreeElement.click()
    await this.setFormFieldValue(
      'Name',
      this.updatedButtonName,
      updateElementForm,
    )

    await this.waitForProgressBar()
  }

  /**
   * wait for progressbar to display after Form autosave delay,
   * and then disappear after the submit request finishes.
   */
  async waitForProgressBar() {
    // wait for spinner to appear with a custom polling interval of 50ms,
    // otherwise, spinner may appear and hide faster that playwright notices it
    await expect(async () => {
      await expect(this.getGlobalProgressBar()).toBeVisible({ timeout: 50 })
    }).toPass({ intervals: [50] })

    await expect(this.getGlobalProgressBar()).toBeHidden()
  }

  private readonly updatedButtonName = 'Button Updated'
}

export const test = base.extend<{ builderPage: BuilderPage }>({
  builderPage: async ({ page }, use) => {
    const builderPage = new BuilderPage(page)

    await use(builderPage)
  },
})
