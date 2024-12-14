import { PageType } from '@codelab/frontend/abstract/types'
import { IPageKindName } from '@codelab/shared/abstract/core'
import { appId } from '@codelab/shared/data/test'
import { test as base, expect, request } from '@playwright/test'

import { BasePage } from '../../locators/pages'

export class PageListPage extends BasePage {
  static async seedApp() {
    const apiRequest = await request.newContext()

    await apiRequest.post('./app/seed-cypress-app')
  }

  readonly pageName = 'New Page'

  readonly updatedPageName = 'Updated Page'

  async expectNoPreexistingPage() {
    await expect(this.getByExactText(this.pageName)).toBeHidden()
  }

  async expectSystemPagesToExist() {
    await expect(this.page.getByText(IPageKindName.Provider)).toBeVisible()
    await expect(this.page.getByText(IPageKindName.NotFound)).toBeVisible()
    await expect(
      this.page.getByText(IPageKindName.InternalServerError),
    ).toBeVisible()
  }

  async goto() {
    await this.page.goto(PageType.PageList({ appId, pageId: this.pageName }))
  }

  async visitPageList(appSlug: string) {
    await this.page.goto(
      `/apps/cypress/${appSlug}/pages/_app/builder?primarySidebarKey=pageList`,
    )
  }
}

export const test = base.extend<{ pageListPage: PageListPage }>({
  pageListPage: async ({ page }, use) => {
    const pageListPage = new PageListPage(page)

    await use(pageListPage)
  },
})
