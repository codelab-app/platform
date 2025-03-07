import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import { IResourceType } from '@codelab/shared/abstract/core'
import { test as base } from '@playwright/test'

import { BasePage } from '../../locators/pages'

export class ResourcePage extends BasePage {
  resourceName = 'New Resource'

  resourcesUrl = 'https://countries.trevorblades.com/'

  updatedResourceName = `${this.resourceName} Updated`

  async createResource() {
    await this.getSidebar(UiKey.ResourceSidebar)
      .locator?.getByLabel(UiKey.ResourceToolbarItemCreate)
      .click()

    await this.page.waitForURL('/resources/create*')

    const form = this.getForm(UiKey.ResourceFormCreate)

    await form.fillInputText({ label: 'Name' }, this.resourceName)
    await form.fillInputSelect({ label: 'Type' }, IResourceType.GraphQl)
    await form.fillInputText({ label: 'Url' }, this.resourcesUrl)
    await this.getPopover(UiKey.ResourcePopoverCreate)
      .getButton({ text: 'Create' })
      .click()

    await this.expectGlobalProgressBarToBeHidden()
  }

  async deleteResource() {
    await this.getTreeItemByPrimaryTitle$(this.updatedResourceName).hover()
    await this.getTreeItemByPrimaryTitle(this.updatedResourceName)
      .getToolbarItem(UiKey.ResourceToolbarItemDelete)
      .click()

    await this.page.waitForURL('/resources/delete/**')

    const modal = await this.getModal(UiKey.ResourceModalDelete)

    await modal.getButton({ label: 'Confirmation Button' }).click()
    await this.expectGlobalProgressBarToBeHidden()
  }

  async goto() {
    await this.page.goto(PageType.Resources())
  }

  async updateResource() {
    await this.getByExactText(this.resourceName).click()
    await this.page.waitForURL('/resources/update/*')

    const form = this.getForm(UiKey.ResourceFormUpdate)

    await form.fillInputText({ label: 'Name' }, this.updatedResourceName)
    await this.getPopover(UiKey.ResourcePopoverUpdate)
      .getButton({ text: 'Update' })
      .click()

    await this.expectGlobalProgressBarToBeHidden()
  }
}

export const test = base.extend<{ resourcePage: ResourcePage }>({
  resourcePage: async ({ page }, use) => {
    const resourcePage = new ResourcePage(page)

    await use(resourcePage)
  },
})
