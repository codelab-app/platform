import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import { IAtomType } from '@codelab/shared/abstract/core'
import { test as base, expect } from '@playwright/test'

import { BuilderPage } from '../builder/builder.fixture'
import {
  componentId,
  spaceElementName,
  typographyElement,
} from './state-sharing.data'

/**
 * Follow guide https://medium.com/@lucgagan/mastering-playwright-best-practices-for-web-automation-with-the-page-object-model-3541412b03d1
 */
export class StateSharingPage extends BuilderPage {
  async createStateVariable(defaultValue: string) {
    const stateAccordion = this.getStateAccordion()

    const createVariable = stateAccordion.getByTestId(
      'cui-toolbar-item-create-field-toolbar-item',
    )

    const submitButton = this.getButton({ text: 'Create' })
    const modal = this.getModalForm(UiKey.ElementPopoverCreate)

    await createVariable.click()
    await this.setFormFieldValue('Key', 'name')
    await this.setFormFieldValue('Type', 'String')
    await this.setFormFieldValue('Default values', defaultValue)
    await this.getDialog().locator(submitButton).click()

    await expect(this.getDialog()).toBeHidden()
    await expect(this.getGlobalProgressBar()).toBeHidden()
    await expect(this.getNotification()).toHaveText(
      'Field created successfully',
    )
  }

  async expandElementsTree() {
    const space = this.getTreeElement(
      spaceElementName,
      IAtomType.AntDesignSpace,
    )

    const typography = this.getTreeElement(
      typographyElement.name,
      typographyElement.atom,
    )

    await this.page.locator('.ant-tree-switcher_close').click()
    await expect(space).toBeVisible()

    await this.page.locator('.ant-tree-switcher_close').click()
    await expect(typography).toBeVisible()
  }

  async goToComponentBuilder() {
    await this.page.goto(PageType.ComponentBuilder({ componentId }))
  }

  async setComponentElementText() {
    const outputContainer = this.getBuilderRenderContainer()
    const typography = outputContainer.locator('.ant-typography')
    const elementOverlay = this.getElementOverlay()

    await expect(typography).toBeVisible()
    await this.selectTreeElement(typographyElement)

    await expect(elementOverlay).toHaveText(typographyElement.name)

    await this.getToggleTextEditorButton().click()
    await this.getTextEditorInput().fill(
      'text {{ componentProps.name ?? rootState.name ?? state.name }}',
    )
    await this.waitForProgressBar()
    await this.getToggleTextEditorButton().click()
  }
}

export const test = base.extend<{ builderPage: StateSharingPage }>({
  builderPage: async ({ page }, use) => {
    const builderPage = new StateSharingPage(page)

    await use(builderPage)
  },
})
