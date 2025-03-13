import { UiKey } from '@codelab/frontend/abstract/types'
import { expect } from '@playwright/test'

import { baseTest } from '../../setup/fixtures/base.fixture'
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
    const form = await this.getForm(UiKey.PageFormUpdate)

    await form.fillInputSelect(
      { label: 'Page Content Container' },
      pageContentContainerName,
      { waitForAutosave: true },
    )
  }
}

export const test = baseTest.extend<{
  builderPage: ProviderPageContentContainerPage
}>({
  builderPage: async ({ page }, use) => {
    const builderPage = new ProviderPageContentContainerPage(page)

    await use(builderPage)
  },
})
