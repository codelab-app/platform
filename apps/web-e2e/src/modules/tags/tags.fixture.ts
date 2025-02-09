import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import { CuiTestId } from '@codelab/frontend-application-shared-data'
import { test as base, expect } from '@playwright/test'

import { BasePage } from '../../locators/pages'

export class TagListPage extends BasePage {
  async createTag(name: string, parentName: string) {
    if (parentName) {
      await this.getTreeTagItem(parentName).click()
    }

    await this.getSidebar(UiKey.TagSidebar)
      .getToolbarItem(UiKey.TagToolbarItemCreate)
      .click()

    await this.page.waitForURL('/tags/create*')
    await this.fillAndSubmitTagForm(name, UiKey.TagFormCreate, 'Create')

    await expect(this.getSkeleton()).toBeHidden()
  }

  async deleteTagNodeInTree(tagName: string) {
    await this.getTree().getTreeItemByPrimaryTitle(tagName).locator?.hover()
    await this.getTree()
      .getTreeItemByPrimaryTitle(tagName)
      .getToolbarItem(UiKey.TagToolbarItemDelete)
      .click()

    await this.page.waitForURL('/tags/delete/**')

    const form = await this.getForm(UiKey.TagModalDelete)

    await form.getButton({ label: 'Confirmation Button' }).click()

    await this.expectGlobalProgressBarToBeHidden()

    await expect(this.getDialog()).toBeHidden()
    await expect(this.getSkeleton()).toBeHidden()
  }

  async expandTagTree() {
    await this.page.locator('.ant-tree-switcher_close').first().click()
    await this.page.locator('.ant-tree-switcher_close').first().click()
  }

  async fillAndSubmitTagForm(name: string, key: UiKey, submitLabel: string) {
    const form = await this.getForm(key)

    await form.fillInputText({ label: 'Name' }, name)
    await form.getButton({ text: submitLabel }).click()
    await this.expectGlobalProgressBarToBeHidden()

    await expect(this.page.getByTestId(CuiTestId.cuiForm(key))).toBeHidden()
  }

  getTreeTagItem(tagName: string) {
    return this.getTree().getTreeItemByPrimaryTitle$(tagName)
  }

  async goto() {
    await this.page.goto(PageType.Tags())
  }

  async updateTag(oldName: string, newName: string) {
    await this.getTreeTagItem(oldName).click()
    await this.page.waitForURL('/tags/update/**')
    await this.fillAndSubmitTagForm(newName, UiKey.TagFormUpdate, 'Update')

    await expect(this.getSkeleton()).toBeHidden()
  }
}

export const test = base.extend<{ tagListPage: TagListPage }>({
  tagListPage: async ({ page }, use) => {
    const tagListPage = new TagListPage(page)

    await use(tagListPage)
  },
})
