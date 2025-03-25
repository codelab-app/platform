import { RoutePaths } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import { CuiTestId } from '@codelab/frontend-application-shared-data'
import { expect } from '@playwright/test'

import { baseTest } from '../../setup/fixtures/base.fixture'
import { BasePage } from '../../setup/locators/pages'

export class TagListPage extends BasePage {
  async createTag(name: string, parentName?: string) {
    if (parentName) {
      await this.getTreeTagItem(parentName).click()
    }

    await this.getSidebar(UiKey.TagSidebar)
      .getToolbarItem(UiKey.TagToolbarItemCreate)
      .click()

    await this.fillAndSubmitTagForm(name, 'Create', {
      form: UiKey.TagFormCreate,
      popover: UiKey.TagPopoverCreate,
    })

    await expect(this.getSkeleton()).toBeHidden()
  }

  async deleteTagNodeInTree(tagName: string) {
    await this.getTree().getTreeItemByPrimaryTitle(tagName).locator?.hover()
    await this.getTree()
      .getTreeItemByPrimaryTitle(tagName)
      .getToolbarItem(UiKey.TagToolbarItemDelete)
      .click()

    const modal = await this.getModal(UiKey.TagModalDelete)

    await modal.getButton({ label: 'Confirmation Button' }).click()

    await this.expectGlobalProgressBarToBeHidden()

    await expect(this.getDialog()).toBeHidden()
    await expect(this.getSkeleton()).toBeHidden()
  }

  async expandTagTree() {
    await this.page.locator('.ant-tree-switcher_close').first().click()
    await this.page.locator('.ant-tree-switcher_close').first().click()
  }

  async fillAndSubmitTagForm(
    name: string,
    submitLabel: string,
    { form, popover }: { form: UiKey; popover: UiKey },
  ) {
    const tagForm = await this.getForm(form)

    await tagForm.fillInputText({ label: 'Name' }, name)
    await this.getPopover(popover).getButton({ text: submitLabel }).click()
    await this.expectGlobalProgressBarToBeHidden()

    await expect(this.page.getByTestId(CuiTestId.cuiForm(form))).toBeHidden()
  }

  getTreeTagItem(tagName: string) {
    return this.getTree().getTreeItemByPrimaryTitle$(tagName)
  }

  async goto() {
    await this.page.goto(RoutePaths.Tags())
  }

  async updateTag(oldName: string, newName: string) {
    await this.getTreeTagItem(oldName).click()
    await this.fillAndSubmitTagForm(newName, 'Update', {
      form: UiKey.TagFormUpdate,
      popover: UiKey.TagPopoverUpdate,
    })

    await expect(this.getSkeleton()).toBeHidden()
  }
}

export const test = baseTest.extend<{ tagListPage: TagListPage }>({
  tagListPage: async ({ page }, use) => {
    const tagListPage = new TagListPage(page)

    await use(tagListPage)
  },
})
