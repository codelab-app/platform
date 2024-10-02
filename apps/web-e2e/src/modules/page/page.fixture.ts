import { IPageKindName } from '@codelab/shared/abstract/core'
import { test as base, expect } from '@playwright/test'

import { BasePage } from '../../locators/pages'

export class PageListPage extends BasePage {
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

  async seedApp() {
    await this.page.request.post('./app/seed-cypress-app')
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
