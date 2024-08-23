    await expect(this.getCard({ name: this.componentName })).toBeHidden()
import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import { expect, test as base } from '@playwright/test'
import { BasePage } from '../../locators/pages'

export class ComponentListPage extends BasePage {
  clickModalConfirmButton() {
    const modal = this.getModal()
    const button = this.getButton({ key: UiKey.ConfirmationButton })

    return modal.locator(button).click()
  }

  async expectPreexistingAtoms() {
    await expect(this.getCard({ name: 'ReactFragment' })).toBeVisible()
  }

  async expectPreexistingComponents() {
    await expect(this.getCard({ name: this.componentName })).toBeHidden()
  }

  async fillCreateComponentForm() {
    await this.getTextBox({ label: 'Name' }).fill(this.componentName)

    await this.getModal()
      .locator(this.getButton({ text: 'Create' }))
      .click()

    await expect(this.getModal()).toBeHidden()
  }

  getComponentName() {
    return this.getByExactText(this.componentName)
  }

  getSpinner() {
    return this.page.getByRole('status')
  }

  async goto() {
    await this.page.goto(PageType.Components())
  }

  async openCreateComponentPanel() {
    await this.getButton({ label: UiKey.CreateComponentToolbarItem }).click()

    await expect(this.getModal()).toBeVisible()
  }

  async openDeleteComponentModal() {
    const card = this.getCard({ name: this.componentName })

    await card.locator(this.getButton({ label: 'Delete' })).click()

    await expect(this.getModal()).toBeVisible()
  }

  private readonly componentName = 'New Component'
}

export const test = base.extend({
  componentListPage: async ({ page }, use) => {
    const componentListPage = new ComponentListPage(page)

    await use(componentListPage)
  },
})
