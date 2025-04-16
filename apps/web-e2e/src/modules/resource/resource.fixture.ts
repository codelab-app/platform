import { RoutePaths } from '@codelab/frontend-abstract-application'
import { UiKey } from '@codelab/frontend-abstract-types'
import { IResourceType } from '@codelab/shared-abstract-core'

import { BasePage } from '../../setup/core/page'
import { baseTest } from '../../setup/fixtures/base.fixture'

export class ResourcePage extends BasePage {
  resourceName = 'New Resource'

  resourcesUrl = 'https://countries.trevorblades.com/'

  updatedResourceName = `${this.resourceName} Updated`

  async createResource() {
    await this.getSidebar(UiKey.ResourceSidebar)
      .locator?.getByLabel(UiKey.ResourceToolbarItemCreate)
      .click()

    const form = await this.getForm(UiKey.ResourceFormCreate)

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

    await this.clickPopconfirmButton(UiKey.ResourceToolbarItemDelete)
  }

  async goto() {
    await this.page.goto(RoutePaths.Resource.base())
  }

  async updateResource() {
    await this.getByExactText(this.resourceName).click()

    const form = await this.getForm(UiKey.ResourceFormUpdate)

    await form.fillInputText({ label: 'Name' }, this.updatedResourceName)
    await this.getPopover(UiKey.ResourcePopoverUpdate)
      .getButton({ text: 'Update' })
      .click()

    await this.expectGlobalProgressBarToBeHidden()
  }
}

export const test = baseTest.extend<{ resourcePage: ResourcePage }>({
  resourcePage: async ({ context, page }, use) => {
    const resourcePage = new ResourcePage(page, context)

    await use(resourcePage)
  },
})
