import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import { IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import { expect } from '@playwright/test'

import { baseTest } from '../../setup/fixtures/base.fixture'
import { BuilderPage } from '../builder/builder.fixture'
import { COMPONENT_PROP_VALUE } from './component.data'

export class ComponentListPage extends BuilderPage {
  async addComponentProps() {
    return test.step('addComponentProps', async () => {
      const componentTab = this.page.locator('.ant-tabs-tabpane-active')

      await componentTab.getByText('Add').click()

      const form = this.getForm(UiKey.FieldFormCreate)

      await form.fillInputText({ label: 'Key' }, this.componentPropName)
      await form.fillInputSelect({ label: 'Type' }, IPrimitiveTypeKind.String)
      await this.page
        .locator('[name="validationRules.general.nullable"]')
        .click()

      await this.getPopover(UiKey.FieldPopoverCreate)
        .getButton({
          text: 'Create',
        })
        .click()

      await this.waitForProgressBar()
    })
  }

  async checkRootElementExists() {
    return test.step('checkRootElementExists', async () => {
      const explorerTree = this.getElementsTree()

      await expect(explorerTree).toBeVisible()
      await expect(
        this.getTreeElement(`${this.componentName} Root`, 'ReactFragment'),
      ).toBeVisible()
    })
  }

  clickModalConfirmButton() {
    const modal = this.getDialog()
    const button = this.getButton({ key: UiKey.ButtonConfirmation })

    return modal.locator(button).click()
  }

  async expectPreexistingAtoms() {
    return test.step('expectPreexistingAtoms', async () => {
      await expect(this.getCard({ name: 'ReactFragment' })).toBeVisible()
    })
  }

  async expectPreexistingComponents() {
    return test.step('expectPreexistingComponents', async () => {
      await expect(this.getCard({ name: this.componentName })).toBeHidden()
    })
  }

  async fillCreateComponentForm() {
    return test.step('fillCreateComponentForm', async () => {
      await this.fillInputText({ label: 'Name' }, this.componentName)

      await this.getDialog()
        .locator(this.getButton({ text: 'Create' }))
        .click()

      await expect(this.getDialog()).toBeHidden()
    })
  }

  getComponentName() {
    return this.getByExactText(this.componentName)
  }

  getSpinner() {
    return this.page.getByRole('status', { name: 'Loading' })
  }

  async goto(appId?: string, pageId?: string) {
    return test.step('goto', async () => {
      if (appId && pageId) {
        await super.goto(appId, pageId)
      } else {
        await this.page.goto(PageType.Components())
      }
    })
  }

  async openComponentBuilder() {
    return test.step('openComponentBuilder', async () => {
      const card = this.getCard({ name: this.componentName })

      await this.getButton(
        { title: 'Edit in Builder' },
        { locator: card },
      ).click()

      await this.checkRootElementExists()
      await expect(this.getSpinner()).toBeHidden()
      await expect(this.getFormFieldSpinner()).toHaveCount(0)
    })
  }

  async openComponentPropsTab() {
    return test.step('openComponentPropsTab', async () => {
      const conponentTab = this.page.locator('[data-node-key="Component"]')

      await conponentTab.click()

      await expect(conponentTab).toHaveClass('ant-tabs-tab ant-tabs-tab-active')
    })
  }

  async openCreateComponentPanel() {
    return test.step('openCreateComponentPanel', async () => {
      await this.getButton({ label: UiKey.ComponentToolbarItemCreate }).click()

      await expect(this.getDialog()).toBeVisible()
    })
  }

  async openDeleteComponentModal() {
    return test.step('openDeleteComponentModal', async () => {
      const card = this.getCard({ name: this.componentName })

      await this.getButton({ title: 'Delete' }, { locator: card }).click()

      await expect(this.getDialog()).toBeVisible()
    })
  }

  async setComponentPropValue() {
    return test.step('setComponentPropValue', async () => {
      await this.page
        .locator('.ant-form-item-control-input [contenteditable]')
        .type(COMPONENT_PROP_VALUE)

      await this.waitForProgressBar()
    })
  }

  private readonly componentName = 'New Component'

  private readonly componentPropName = 'component_prop'
}

export const test = baseTest.extend<{ componentListPage: ComponentListPage }>({
  componentListPage: async ({ page }, use) => {
    const componentListPage = new ComponentListPage(page)

    await use(componentListPage)
  },
})
