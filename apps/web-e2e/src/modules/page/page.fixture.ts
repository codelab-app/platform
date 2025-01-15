import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import { IPageKindName } from '@codelab/shared/abstract/core'
import { test as base, expect, request } from '@playwright/test'

import { getCuiTree } from '../../commands'
import { BasePage } from '../../locators/pages'

export class PageListPage extends BasePage {
  static async seedApp() {
    const apiRequest = await request.newContext()

    await apiRequest.post('./app/seed-cypress-app')
  }

  readonly pageName = 'New Page'

  readonly updatedPageName = 'Updated Page'

  async createPage() {
    await this.getSidebar(UiKey.PageSidebar)
      .getToolbarItem(UiKey.PageToolbarItemCreate)
      .click()

    const form = await this.getForm(UiKey.PageFormCreate)

    await form.fillInputText({ label: 'Name' }, this.pageName)
    await form.getButton({ text: 'Create' }).click()
    await this.expectGlobalProgressBarToBeHidden()
  }

  async deletePage() {
    await this.getTreeItemByPrimaryTitle$(this.updatedPageName).hover()
    await this.getTreeItemByPrimaryTitle(this.updatedPageName)
      .getToolbarItem(UiKey.PageToolbarItemDelete)
      .click()

    await this.clickPopconfirmButton()
    await this.expectGlobalProgressBarToBeHidden()
  }

  async expectNoPreexistingPage() {
    await expect(this.getByExactText(this.pageName)).toBeHidden()
  }

  async expectSystemPagesToExist() {
    const cuiTree = getCuiTree(this.page)

    await expect(cuiTree.getByText(IPageKindName.Provider)).toBeVisible()
    await expect(cuiTree.getByText(IPageKindName.NotFound)).toBeVisible()
    await expect(
      cuiTree.getByText(IPageKindName.InternalServerError),
    ).toBeVisible()
  }

  async goto(appId: string, pageId: string) {
    await this.page.goto(PageType.PageList({ appId, pageId }))
  }

  async updatePage() {
    await this.getTreeItemByPrimaryTitle$(this.pageName).hover()
    await this.getTreeItemByPrimaryTitle(this.pageName)
      .getToolbarItem(UiKey.PageToolbarItemUpdate)
      .click()

    const form = await this.getForm(UiKey.PageFormUpdate)

    await form.fillInputText({ label: 'Name' }, this.updatedPageName)
    await form.getButton({ text: 'Update' }).click()
    await this.expectGlobalProgressBarToBeHidden()
  }
}

export const test = base.extend<{ pageListPage: PageListPage }>({
  pageListPage: async ({ page }, use) => {
    const pageListPage = new PageListPage(page)

    await use(pageListPage)
  },
})
