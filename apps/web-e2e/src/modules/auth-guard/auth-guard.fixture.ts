import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import { test as base, expect } from '@playwright/test'

import { BasePage } from '../../locators/pages'
import { resourceName } from './auth-guard.data'

export class AuthGuardPage extends BasePage {
  readonly authGuardName = 'New Auth Guard'

  readonly authGuardRedirectName = 'New Auth Guard Redirect'

  readonly pageName = 'Page'

  readonly updatedAuthGuardName = 'Updated Auth Guard'

  async createAuthGuard() {
    await this.getSidebar(UiKey.AuthGuardSidebar)
      .getToolbarItem(UiKey.AuthGuardToolbarItemCreate)
      .click()

    const form = await this.getForm(UiKey.AuthGuardFormCreate)

    await form.fillInputText({ label: 'Name' }, this.authGuardName)
    await form.fillInputFilterSelect({ label: 'Resource' }, resourceName)
    await form.getButton({ text: 'Create' }).click()
    await this.expectGlobalProgressBarToBeHidden()
  }

  async createAuthGuardRedirect() {
    const tree = this.getTree()

    await this.getTreeItemByPrimaryTitle$(this.pageName).hover()
    await this.getTreeItemByPrimaryTitle(this.pageName)
      .getToolbarItem(UiKey.RedirectToolbarItemCreate)
      .click()

    const form = await this.getForm(UiKey.RedirectFormCreate)

    await form.fillInputFilterSelect(
      { label: 'Auth Guard' },
      this.authGuardName,
    )
    await form.fillInputSelect({ label: 'Target type' }, 'Url')
    await form.fillInputText({ label: 'Target url' }, 'http://test.com')
    await form.getButton({ text: 'Create' }).click()
    await this.expectGlobalProgressBarToBeHidden()
  }

  async createPage() {
    await this.getSidebar(UiKey.PageSidebar)
      .getToolbarItem(UiKey.PageToolbarItemCreate)
      .click()

    const form = await this.getForm(UiKey.PageFormCreate)

    await form.fillInputText({ label: 'Name' }, this.pageName)
    await form.getButton({ text: 'Create' }).click()
    await this.expectGlobalProgressBarToBeHidden()
  }

  async deleteAuthGuard() {
    await this.getTreeItemByPrimaryTitle$(this.updatedAuthGuardName).hover()
    await this.getTreeItemByPrimaryTitle(this.updatedAuthGuardName)
      .getToolbarItem(UiKey.AuthGuardToolbarItemDelete)
      .click()

    const form = await this.getForm(UiKey.AuthGuardModalDelete)

    await form.getButton({ label: 'Confirmation Button' }).click()
    await this.expectGlobalProgressBarToBeHidden()
  }

  async deleteAuthGuardRedirect() {
    await this.getTreeItemByPrimaryTitle$(this.pageName).hover()
    await this.getTreeItemByPrimaryTitle(this.pageName)
      .getToolbarItem(UiKey.RedirectToolbarItemUpdate)
      .click()

    const popover = await this.getPopover(UiKey.RedirectPopoverUpdate)

    await popover.getButton({ text: 'Delete' }, this.locator).click()
    await popover.clickPopconfirmButton()

    await expect(this.getGlobalProgressBar()).toBeHidden()
  }

  async expectNoPreexistingGuards() {
    await expect(this.getByExactText(this.authGuardName)).toBeHidden()
  }

  getPageRedirectIcon() {
    return this.page.locator('.anticon.anticon-lock')
  }

  async goToAppPageList(appId: string, pageId: string) {
    await this.page.goto(PageType.PageList({ appId, pageId }))
  }

  async goto() {
    await this.page.goto(PageType.AuthGuards())
  }

  async updateAuthGuard() {
    await this.getTreeItemByPrimaryTitle$(this.authGuardName).click()

    const form = await this.getForm(UiKey.AuthGuardFormUpdate)

    await form.fillInputText({ label: 'Name' }, this.updatedAuthGuardName)
    await form.getButton({ text: 'Update' }).click()
    await this.expectGlobalProgressBarToBeHidden()
  }

  async updateAuthGuardRedirect() {
    const tree = this.getTree()

    await this.getTreeItemByPrimaryTitle$(this.pageName).hover()
    await this.getTreeItemByPrimaryTitle(this.pageName)
      .getToolbarItem(UiKey.RedirectToolbarItemUpdate)
      .click()

    const form = await this.getForm(UiKey.RedirectFormUpdate)

    await form.fillInputText({ label: 'Target url' }, 'http://test-updated.com')
    await form.getButton({ text: 'Update' }).click()
    await this.expectGlobalProgressBarToBeHidden()
  }
}

export const test = base.extend<{ authGuardPage: AuthGuardPage }>({
  authGuardPage: async ({ page }, use) => {
    const authGuardPage = new AuthGuardPage(page)

    await use(authGuardPage)
  },
})
