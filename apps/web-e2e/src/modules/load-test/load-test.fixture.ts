import { RoutePaths } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import { E2E_ATOM_TYPES } from '@codelab/shared/data/test'
import { expect } from '@playwright/test'

import { baseTest } from '../../setup/fixtures/base.fixture'
import { BuilderPage } from '../builder/builder.fixture'
import { PAGE_COUNT } from './load-test.data'

/**
 * Follow guide https://medium.com/@lucgagan/mastering-playwright-best-practices-for-web-automation-with-the-page-object-model-3541412b03d1
 */
export class LoadTestPage extends BuilderPage {
  async validateCanOpenAppListPage(appName: string) {
    await this.page.goto(RoutePaths.App.list())

    await expect(this.getSpinner()).toBeHidden()

    await this.checkPageHeaderTitle(['Apps'])

    await expect(this.getByExactText(appName)).toBeVisible()
  }

  async validateCanOpenPageBuilderPage() {
    await this.getTreeItemByPrimaryTitle$('Page 0').hover()
    await this.getTreeItemByPrimaryTitle('Page 0')
      .getToolbarItem(UiKey.BuilderToolbarItemOpenBuilder)
      .click()

    await this.checkBuilderPage()
    await this.page.reload()
    await this.checkBuilderPage()
  }

  async validateCanOpenPageListPage(appName: string) {
    await this.getByExactText(appName).click()
    await this.checkPageListPage(appName)
    await this.page.reload()
    await this.checkPageListPage(appName)
  }

  private async checkBuilderPage() {
    await this.checkRootElementExists()
    await this.page.locator('span[aria-label="plus-square"]').click()

    await expect(this.page.getByRole('treeitem')).toHaveCount(
      // +1 for the root ReactFragment element
      E2E_ATOM_TYPES.length + 1,
    )

    await expect(
      this.getBuilderRenderContainer().locator('[data-element-id]'),
    ).toHaveCount(E2E_ATOM_TYPES.length)

    // close it for next check
    await this.page.locator('span[aria-label="minus-square"]').click()
  }

  private async checkPageListPage(appName: string) {
    await this.checkPageHeaderTitle([appName, 'Pages'])

    await expect(this.getSpinner()).toBeHidden()

    await expect(this.page.getByRole('treeitem')).toHaveCount(PAGE_COUNT + 3)
  }
}

export const test = baseTest.extend<{ builderPage: LoadTestPage }>({
  builderPage: async ({ context, page }, use) => {
    const builderPage = new LoadTestPage(page, context)

    await use(builderPage)
  },
})
