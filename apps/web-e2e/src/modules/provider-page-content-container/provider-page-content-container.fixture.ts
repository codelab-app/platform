import { expect, test as base } from '@playwright/test'
import { BuilderPage } from '../builder/builder.fixture'
import { pageContentContainerName } from './provider-page-content-container.data'

/**
 * Follow guide https://medium.com/@lucgagan/mastering-playwright-best-practices-for-web-automation-with-the-page-object-model-3541412b03d1
 */
export class ProviderPageContentContainerPage extends BuilderPage {
  async checkPageIsInsideProviderPageContainer() {
    const outputContainer = this.getBuilderRenderContainer()
    const cardElement = outputContainer.locator('.ant-card-body')
    const inputElement = cardElement.locator('input')

    await expect(inputElement).toBeVisible()
  }

  async openPageSettingsTab() {
    const pageSettingsTab = this.page.locator('[data-node-key="Page"]')

    await pageSettingsTab.click()

    await expect(pageSettingsTab).toHaveClass(
      'ant-tabs-tab ant-tabs-tab-active',
    )
  }

  async setPageContentContainer() {
    const pageSettingsTab = this.page.locator('.ant-tabs-tabpane-active')

    await this.setFormFieldValue(
      'Page Content Container',
      pageContentContainerName,
      pageSettingsTab,
    )
    await this.waitForSpinner()
  }
}

export const test = base.extend<{
  builderPage: ProviderPageContentContainerPage
}>({
  builderPage: async ({ page }, use) => {
    const builderPage = new ProviderPageContentContainerPage(page)

    await use(builderPage)
  },
})
