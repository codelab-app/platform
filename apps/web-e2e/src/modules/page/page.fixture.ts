import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import { IPageKindName } from '@codelab/shared/abstract/core'
import { expect } from '@playwright/test'

import { baseTest } from '../../setup/fixtures/base.fixture'
import { BasePage } from '../../setup/locators/pages'

export class PageListPage extends BasePage {
  readonly pageName = 'New Page'

  readonly updatedPageName = 'Updated Page'

  async createPage() {
    await this.getSidebar(UiKey.PageSidebar)
      .getToolbarItem(UiKey.PageToolbarItemCreate)
      .click()

    const form = await this.getForm(UiKey.PageFormCreate)

    // wait for the form to stabilize and finish animations
    await expect(form.getByExactText('Use / for "Home" page')).toBeVisible()
    await form.fillInputText({ label: 'Name' }, this.pageName)
    await this.getPopover(UiKey.PagePopoverCreate)
      .getButton({ text: 'Create' })
      .click()
    await this.expectGlobalProgressBarToBeHidden()
  }

  async deletePage() {
    await this.getTreeItemByPrimaryTitle$(this.updatedPageName).hover()
    await this.getTreeItemByPrimaryTitle(this.updatedPageName)
      .getToolbarItem(UiKey.PageToolbarItemDelete)
      .click()

    await this.clickPopconfirmButton(UiKey.PageToolbarItemDelete)
    await this.expectGlobalProgressBarToBeHidden()
  }

  async expectNoPreexistingPage() {
    await expect(this.getByExactText(this.pageName)).toBeHidden()
  }

  async expectSystemPagesToExist() {
    const cuiTree = this.getCuiTree()

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
    await this.getPopover(UiKey.PagePopoverUpdate)
      .getButton({ text: 'Update' })
      .click()
    await this.expectGlobalProgressBarToBeHidden()
  }
}

export const test = baseTest.extend<{ pageListPage: PageListPage }>({
  pageListPage: async ({ page }, use) => {
    const pageListPage = new PageListPage(page)

    await use(pageListPage)
  },
})
