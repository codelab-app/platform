import type { ICreateElementSeedData } from '@codelab/shared/abstract/core'

import { RoutePaths } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import { CuiTestId } from '@codelab/frontend-application-shared-data'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config/env'
import { expect } from '@playwright/test'

import { baseTest } from '../../setup/fixtures/base.fixture'
import { BasePage } from '../../setup/locators/pages'

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
      for (const element of elements) {
        const { atom, name, parentElement, propsData } = element

        const parentTreeElement =
          await this.getTree().getTreeItemByPrimaryTitle$(parentElement)

        await parentTreeElement.click()
        // we hover so the plus icon is visible
        await parentTreeElement.hover()

        await this.getTree()
          .getTreeItemByPrimaryTitle(parentElement)
          .getToolbarItem(UiKey.ElementToolbarItemCreate)
          .click()

        const form = await this.getForm(UiKey.ElementFormCreate)

        await expect(form.getByLabel('Name')).toHaveValue('React Fragment')

        await form.fillInputText({ label: 'Name' }, name)
        await form.fillInputSelect({ label: 'Render Type' }, atom)

        if (propsData) {
          await form.fillInputText(
            { label: 'Props Data' },
            JSON.stringify(propsData),
          )
        }

        await this.getPopover(UiKey.ElementPopoverCreate)
          .getButton({ text: 'Create' })
          .click()

        await this.expectGlobalProgressBarToBeHidden()
        await this.expectNotificationSuccess('Element created successfully')
        await this.waitForPage(new RegExp(/^((?!create-element).)*$/gm))

        await parentTreeElement.getByLabel('plus').click()

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
      await this.expectNotificationSuccess('Element deleted')
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
      await this.clickPopconfirmButton(UiKey.ElementPopconfirmOverlayDelete)

      await expect(this.getGlobalProgressBar()).toBeHidden()
    })
  }

  async deleteElementFromUpdateForm(element: ICreateElementSeedData) {
    return test.step('deleteElementFromUpdateForm', async () => {
      await this.selectTreeElement(element)

      await this.getConfigPane()
        .locator(this.page.getByRole('button', { name: 'Delete' }))
        .click()
      await this.clickPopconfirmButton(UiKey.ElementPopconfirmFormDelete)
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

  getStateAccordion() {
    return this.page.getByTestId('cui-sidebar-view-header-state')
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
    return this.getForm$(UiKey.ElementFormUpdate)
  }

  async goto(appId: string, pageId: string) {
    return test.step('goto', async () => {
      await this.page.goto(RoutePaths.Page.builder({ appId, pageId }))
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

      await expect(openBuilderButton).toBeHidden()
      await expect(openPreviewButton).toBeVisible()
      await expect(this.page.getByLabel('loading')).toHaveCount(0)
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

  async updateBuilderElement() {
    return test.step('updateBuilderElement', async () => {
      const buttonTreeElement = this.getTreeElement('Button', 'AntDesignButton')
      const updateElementForm = this.getUpdateElementForm()

      await buttonTreeElement.click()
      await this.fillInputText({ label: 'Name' }, this.updatedButtonName, {
        locator: updateElementForm,
        waitForAutosave: true,
      })
    })
  }

  private readonly updatedButtonName = 'Button Updated'
}

export const test = baseTest.extend<{ builderPage: BuilderPage }>({
  builderPage: async ({ page }, use) => {
    const builderPage = new BuilderPage(page)

    await use(builderPage)
  },
})
