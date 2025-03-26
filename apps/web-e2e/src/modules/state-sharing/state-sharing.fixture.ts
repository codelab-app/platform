import { RoutePaths } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import { IAtomType } from '@codelab/shared/abstract/core'
import { expect } from '@playwright/test'

import { baseTest } from '../../setup/fixtures/base.fixture'
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
    return test.step('createStateVariable', async () => {
      const stateAccordion = this.getStateAccordion()

      const createVariable = stateAccordion.getByTestId(
        'cui-toolbar-item-create-field-toolbar-item',
      )

      await createVariable.click()

      const form = this.getForm(UiKey.FieldFormCreate)

      await form.fillInputText({ label: 'Key' }, 'name')
      await form.fillInputSelect({ label: 'Type' }, 'String')
      await form.fillInputText({ label: 'Default values' }, defaultValue)

      await this.getPopover(UiKey.FieldPopoverCreate)
        .getButton({ text: 'Create' })
        .click()

      await expect(this.getDialog()).toBeHidden()
      await expect(this.getGlobalProgressBar()).toBeHidden()
      await expect(this.getNotification()).toHaveText(
        'Field created successfully',
      )
    })
  }

  async expandElementsTree() {
    return test.step('expandElementsTree', async () => {
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
    })
  }

  async goToComponentBuilder() {
    return test.step('goToComponentBuilder', async () => {
      await this.page.goto(RoutePaths.Component.builder({ componentId }))
    })
  }

  async setComponentElementText() {
    return test.step('setComponentElementText', async () => {
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
    })
  }
}

export const test = baseTest.extend<{ builderPage: StateSharingPage }>({
  builderPage: async ({ page }, use) => {
    const builderPage = new StateSharingPage(page)

    await use(builderPage)
  },
})
