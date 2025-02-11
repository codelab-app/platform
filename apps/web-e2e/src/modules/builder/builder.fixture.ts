import type { ICreateElementSeedData } from '@codelab/shared/abstract/core'
import type { Locator } from '@playwright/test'

import {
  PageType,
  PrimarySidebar,
  UiKey,
} from '@codelab/frontend/abstract/types'
import { CuiTestId } from '@codelab/frontend-application-shared-data'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config/env'
import { test as base, expect } from '@playwright/test'

import { setFormFieldValue } from '../../commands'
import { BasePage } from '../../locators/pages'

/**
 * Follow guide https://medium.com/@lucgagan/mastering-playwright-best-practices-for-web-automation-with-the-page-object-model-3541412b03d1
 */
export class BuilderPage extends BasePage {
  async checkBuilderIsUpdated() {
    return test.step('checkBuilderIsUpdated', async () => {
      await expect(
        this.getTreeElement('Button Updated', 'AntDesignButton'),
      ).toBeVisible()
    })
  }

  async checkBuilderOutput() {
    return test.step('checkBuilderOutput', async () => {
      const outputContainer = this.getBuilderRenderContainer()
      const antDesignRow = outputContainer.locator('.ant-row')

      await expect(antDesignRow).toBeVisible()

      const antDesignCols = antDesignRow.locator('.ant-col')
      const firstColTypography = antDesignCols.nth(0).locator('.ant-typography')
      const secondColButton = antDesignCols.nth(1).locator('.ant-btn')
      const lastColEmpty = antDesignCols.nth(2)

      await expect(antDesignCols).toHaveCount(3)
      await expect(firstColTypography).toContainText('Ant Design Text Element')
      await expect(secondColButton).toContainText('Click Me!')
      await expect(lastColEmpty).toBeEmpty()
    })
  }

  async checkElementTreeStructure(expectedTreeElements: Array<string>) {
    return test.step('checkElementTreeStructure', async () => {
      const elementsTree = this.getElementsTree()
      const treeElements = elementsTree.locator('.ant-tree-treenode')

      for (let i = 0; i < expectedTreeElements.length; i++) {
        const element = expectedTreeElements[i]

        if (element) {
          await expect(treeElements.nth(i + 1)).toContainText(element)
        }

        if (await this.page.locator('.ant-tree-switcher_close').isVisible()) {
          await this.page.locator('.ant-tree-switcher_close').click()
        }
      }
    })
  }

  async checkRootElementExists() {
    return test.step('checkRootElementExists', async () => {
      const explorerTree = this.getElementsTree()

      await expect(explorerTree).toBeVisible()
      await expect(
        this.getTreeElement(ROOT_ELEMENT_NAME, 'ReactFragment'),
      ).toBeVisible()
    })
  }

  async clickModalConfirmButton() {
    const modal = this.getDialog()
    const button = this.getButton({ key: UiKey.ButtonConfirmation })

    await expect(this.getDialog()).toBeVisible()

    await modal.locator(button).click()
  }

  /**
   * Page is reloading while creating element tree for some reason
   */
  async createElementTree(elements: Array<ICreateElementSeedData>) {
    return test.step('createElementTree', async () => {
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

        await expect(modal.locator).toBeDefined()
        await expect(modal.locator!.getByLabel('Name')).toHaveValue(
          'React Fragment',
        )

        await this.setFormFieldValue('Name', name)
        await this.setFormFieldValue('Render Type', atom)

        if (propsData) {
          await this.setFormFieldValue('Props Data', propsData)
        }

        await this.getDialog().locator(submitButton).click()
        await this.waitForProgressBar()

        await expect(this.getDialog()).toBeHidden()
        await expect(this.getTreeElement(name, atom)).toBeVisible()
      }
    })
  }

  async deleteElementByContextMenu(element: ICreateElementSeedData) {
    return test.step('deleteElementByContextMenu', async () => {
      const treeElement = await this.selectTreeElement(element)

      await treeElement.click({ button: 'right' })
      await this.page.getByText(`Delete \`${element.name}\``).click()
      await this.clickModalConfirmButton()

      await expect(this.getGlobalProgressBar()).toBeHidden()
      await expect(this.getNotification()).toHaveText('Element deleted')
      await expect(treeElement).toBeHidden()
    })
  }

  async deleteElementFromOverlay(element: ICreateElementSeedData) {
    return test.step('deleteElementFromOverlay', async () => {
      await this.selectTreeElement(element)

      const deleteElementButton =
        this.getElementOverlay().locator('.anticon-delete')

      await expect(deleteElementButton).toBeVisible()
      await deleteElementButton.click()
      await this.clickPopconfirmButton(UiKey.ElementPopoverOverlayDelete)

      await expect(this.getGlobalProgressBar()).toBeHidden()
    })
  }

  async deleteElementFromUpdateForm(element: ICreateElementSeedData) {
    return test.step('deleteElementFromUpdateForm', async () => {
      await this.selectTreeElement(element)

      await this.getConfigPane()
        .locator(this.page.getByRole('button', { name: 'Delete' }))
        .click()
      await this.clickPopconfirmButton(UiKey.ElementPopoverFormDelete)
    })
  }

  getBuilderRenderContainer() {
    return this.page.locator('#render-root')
  }

  getConfigPane() {
    return this.page.getByTestId(CuiTestId.cuiConfigPane())
  }

  getElementOverlay() {
    return this.page.locator('#render-blueprint-container')
  }

  getElementsTree() {
    const explorerTreeTestId = CuiTestId.cuiSidebarViewContent('Elements Tree')

    return this.page.getByTestId(explorerTreeTestId)
  }

  getFormFieldSpinner() {
    return this.page.locator('.ant-form-item-control').getByLabel('loading')
  }

  getSelectedTreeElement() {
    return this.page.locator('.ant-tree-treenode-selected')
  }

  getSpinner() {
    return this.page.getByRole('status', { name: 'Loading' })
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
    return test.step('goto', async () => {
      await this.page.goto(
        PageType.PageBuilder({ appId, pageId }, PrimarySidebar.ElementTree),
      )
    })
  }

  async openBuilder() {
    return test.step('openBuilder', async () => {
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
    })
  }

  async openPreview() {
    return test.step('openPreview', async () => {
      const openPreviewButton = this.page
        .getByTestId('cui-toolbar-item-open-preview-builder-toolbar-item')
        .locator('button')

      const openBuilderButton = this.page
        .getByTestId('cui-toolbar-item-open-builder-builder-toolbar-item')
        .locator('button')

      await openPreviewButton.click()

      await expect(openPreviewButton).toBeHidden()
      await expect(openBuilderButton).toBeVisible()
    })
  }

  async openPropsTab() {
    return test.step('openPropsTab', async () => {
      const cssTab = this.page.locator('[data-node-key="Props"]')

      await cssTab.click()

      await expect(cssTab).toHaveClass('ant-tabs-tab ant-tabs-tab-active')
      await expect(this.getSpinner()).toBeHidden()
    })
  }

  async selectTreeElement(
    element: Pick<ICreateElementSeedData, 'atom' | 'name'>,
  ) {
    return test.step('selectTreeElement', async () => {
      const { atom, name } = element
      const treeElement = this.getTreeElement(name, atom)
      const selectedTreeElement = this.getSelectedTreeElement()

      await treeElement.click()

      await expect(selectedTreeElement).toHaveText(
        new RegExp(`^(${name}${atom}|${name}instance of ${atom})$`),
      )
      await expect(this.getFormFieldSpinner()).toHaveCount(0)

      return treeElement
    })
  }

  async setFormFieldValue(
    label: string,
    value: string,
    options?: { locator?: Locator; waitForAutosave?: boolean },
  ) {
    return test.step('setFormFieldValue', async () => {
      const locator = options?.locator ?? this.locator

      if (!locator) {
        throw new Error('Locator is not set')
      }

      await setFormFieldValue(locator, {
        label,
        value,
      })

      if (options?.waitForAutosave) {
        await this.waitForProgressBar()
      }
    })
  }

  async updateBuilderElement() {
    return test.step('updateBuilderElement', async () => {
      const buttonTreeElement = this.getTreeElement('Button', 'AntDesignButton')
      const updateElementForm = this.getUpdateElementForm()

      await buttonTreeElement.click()
      await this.setFormFieldValue('Name', this.updatedButtonName, {
        locator: updateElementForm,
        waitForAutosave: true,
      })
    })
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

        await expect(isVisible).toBeVisible()
      }).toPass({
        // Use shorter polling intervals for better detection
        intervals: [25, 50, 100, 125, 150, 175, 200],
        // Add reasonable timeout to prevent infinite waiting
        timeout: 10000,
      })

      // Then wait for it to disappear
      await expect(this.getGlobalProgressBar()).toBeHidden()
    })
  }

  private readonly updatedButtonName = 'Button Updated'
}

export const test = base.extend<{ builderPage: BuilderPage }>({
  builderPage: async ({ page }, use) => {
    const builderPage = new BuilderPage(page)

    await use(builderPage)
  },
})
