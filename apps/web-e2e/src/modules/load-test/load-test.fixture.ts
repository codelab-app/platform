import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import { atomTypes } from '@codelab/shared/data/test'
import { test as base, expect } from '@playwright/test'

import { BuilderPage } from '../builder/builder.fixture'
import { PAGE_COUNT } from './load-test.data'

/**
 * Follow guide https://medium.com/@lucgagan/mastering-playwright-best-practices-for-web-automation-with-the-page-object-model-3541412b03d1
 */
export class LoadTestPage extends BuilderPage {
  async validateCanOpenAppListPage(appName: string) {
    await this.page.goto(PageType.AppList())

    await expect(this.getSpinner()).toBeHidden()

    await this.checkPageHeaderTitle(['Apps'])

    await expect(this.getByExactText(appName)).toBeVisible()
  }

  async validateCanOpenPageBuilderPage() {
    await this.getTreeItemByPrimaryTitle$('Page 0').hover()
    await this.getTreeItemByPrimaryTitle('Page 0')
      .getToolbarItem(UiKey.BuilderToolbarItemOpenBuilder)
      .click()

    await this.checkRootElementExists()
    await this.page.locator('span[aria-label="plus-square"]').click()

    await expect(this.page.getByRole('treeitem')).toHaveCount(
      // +1 for the root ReactFragment element
      atomTypes.length + 1,
    )

    const outputContainer = this.getBuilderRenderContainer()

    await expect(outputContainer.locator(':scope > *')).toHaveCount(
      // +1 for the blueprint component
      atomTypes.length + 1,
    )
  }

  async validateCanOpenPageListPage(appName: string) {
    await this.getByExactText(appName).click()

    await this.checkPageHeaderTitle([appName, 'Pages', 'provider'])

    await expect(this.getSpinner()).toBeHidden()

    await expect(this.page.getByRole('treeitem')).toHaveCount(PAGE_COUNT + 3)
  }
}

export const test = base.extend<{ builderPage: LoadTestPage }>({
  builderPage: async ({ page }, use) => {
    const builderPage = new LoadTestPage(page)

    await use(builderPage)
  },
})
