import type { IPageCreateFormData } from '@codelab/shared/abstract/core'

import { RoutePaths } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import { IPageKind } from '@codelab/shared/abstract/core'
import { expect } from '@playwright/test'
import { v4 } from 'uuid'

import { BasePage } from '../../setup/core/page'
import { baseTest } from '../../setup/fixtures/base.fixture'
import { resourceName } from './auth-guard.data'

export const authGuardPageData: Omit<IPageCreateFormData, 'app'> = {
  id: v4(),
  kind: IPageKind.Regular,
  name: 'Auth Guard Page',
  urlPattern: 'http://test.com',
}

export class AuthGuardPage extends BasePage {
  readonly authGuardName = 'New Auth Guard'

  readonly authGuardRedirectName = 'New Auth Guard Redirect'

  readonly updatedAuthGuardName = 'Updated Auth Guard'

  async createAuthGuard() {
    return test.step('createAuthGuard', async () => {
      await this.getSidebar(UiKey.AuthGuardSidebar)
        .getToolbarItem(UiKey.AuthGuardToolbarItemCreate)
        .click()

      const form = await this.getForm(UiKey.AuthGuardFormCreate)

      await form.fillInputText({ label: 'Name' }, this.authGuardName)
      await form.fillInputSelect({ label: 'Resource' }, resourceName)
      await this.getPopover(UiKey.AuthGuardPopoverCreate)
        .getButton({ text: 'Create' })
        .click()
      await this.expectGlobalProgressBarToBeHidden()
    })
  }

  async createAuthGuardRedirect() {
    return test.step('createAuthGuardRedirect', async () => {
      await this.getTree()
        .getTreeItemByPrimaryTitle$(authGuardPageData.name)
        .hover()
      await this.getTree()
        .getTreeItemByPrimaryTitle(authGuardPageData.name)
        .getToolbarItem(UiKey.RedirectToolbarItemCreate)
        .click()

      const form = await this.getForm(UiKey.RedirectFormCreate)

      await form.fillInputSelect({ label: 'Auth Guard' }, this.authGuardName)
      await form.fillInputSelect({ label: 'Target type' }, 'Url')
      await form.fillInputText({ label: 'Target url' }, 'http://test.com')
      await this.getPopover(UiKey.RedirectPopoverCreate)
        .getButton({ text: 'Create' })
        .click()
      await this.expectGlobalProgressBarToBeHidden()
    })
  }

  async deleteAuthGuard() {
    return test.step('deleteAuthGuard', async () => {
      await this.getTreeItemByPrimaryTitle$(this.updatedAuthGuardName).hover()
      await this.getTreeItemByPrimaryTitle(this.updatedAuthGuardName)
        .getToolbarItem(UiKey.AuthGuardToolbarItemDelete)
        .click()

      const modal = await this.getModal(UiKey.AuthGuardModalDelete)

      await modal.getButton({ label: 'Confirmation Button' }).click()
      await this.expectGlobalProgressBarToBeHidden()
    })
  }

  async deleteAuthGuardRedirect() {
    return test.step('deleteAuthGuardRedirect', async () => {
      await this.getTreeItemByPrimaryTitle$(authGuardPageData.name).hover()
      await this.getTreeItemByPrimaryTitle(authGuardPageData.name)
        .getToolbarItem(UiKey.RedirectToolbarItemUpdate)
        .click()

      const popover = await this.getPopover(UiKey.RedirectPopoverUpdate)

      await popover.getButton({ text: 'Delete' }).click()
      await popover.clickPopconfirmButton(UiKey.RedirectPopconfirmDelete)

      await expect(this.getGlobalProgressBar()).toBeHidden()
    })
  }

  async expectNoPreexistingGuards() {
    return test.step('expectNoPreexistingGuards', async () => {
      await expect(this.getByExactText(this.authGuardName)).toBeHidden()
    })
  }

  getPageRedirectIcon() {
    return test.step('getPageRedirectIcon', () =>
      this.page.getByLabel('lock').locator('svg'))
  }

  async goToAppPageList(appId: string, pageId: string) {
    return test.step('goToAppPageList', async () => {
      await this.page.goto(RoutePaths.Page.list({ appId, pageId }))
    })
  }

  async goto() {
    return test.step('goto', async () => {
      await this.page.goto(RoutePaths.AuthGuard.base())
    })
  }

  async updateAuthGuard() {
    return test.step('updateAuthGuard', async () => {
      await this.getTreeItemByPrimaryTitle$(this.authGuardName).click()

      const form = await this.getForm(UiKey.AuthGuardFormUpdate)

      await form.fillInputText({ label: 'Name' }, this.updatedAuthGuardName)
      await this.getPopover(UiKey.AuthGuardPopoverUpdate)
        .getButton({ text: 'Update' })
        .click()
      await this.expectGlobalProgressBarToBeHidden()
    })
  }

  async updateAuthGuardRedirect() {
    return test.step('updateAuthGuardRedirect', async () => {
      await this.getTree()
        .getTreeItemByPrimaryTitle$(authGuardPageData.name)
        .hover()
      await this.getTree()
        .getTreeItemByPrimaryTitle(authGuardPageData.name)
        .getToolbarItem(UiKey.RedirectToolbarItemUpdate)
        .click()

      const form = await this.getForm(UiKey.RedirectFormUpdate)

      await form.fillInputText(
        { label: 'Target url' },
        'http://test-updated.com',
      )
      await this.getPopover(UiKey.RedirectPopoverUpdate)
        .getButton({ text: 'Update' })
        .click()
      await this.expectGlobalProgressBarToBeHidden()
    })
  }
}

export const test = baseTest.extend<{ authGuardPage: AuthGuardPage }>({
  authGuardPage: async ({ context, page }, use) => {
    const authGuardPage = new AuthGuardPage(page, context)

    await use(authGuardPage)
  },
})
