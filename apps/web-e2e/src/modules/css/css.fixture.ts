import { test as base, expect } from '@playwright/test'

import { BuilderPage } from '../builder/builder.fixture'

/**
 * Follow guide https://medium.com/@lucgagan/mastering-playwright-best-practices-for-web-automation-with-the-page-object-model-3541412b03d1
 */
export class CssBuilderPage extends BuilderPage {
  getStyledButton() {
    const builderContainer = this.getBuilderRenderContainer()

    return builderContainer.locator('.ant-btn').first()
  }

  async openCssTab() {
    const cssTab = this.page.locator('[data-node-key="CSS"]')

    await cssTab.click()

    await expect(cssTab).toHaveClass('ant-tabs-tab ant-tabs-tab-active')
  }

  async setGuiStyling() {
    const displyNoneButton = this.page.locator(
      '[data-test-id="gui-display"] [title="None"]',
    )

    await displyNoneButton.click()
    await this.waitForProgressBar()
  }

  async typeIntoCssEditor(css: string) {
    const cssTab = this.page.locator('.ant-tabs-tabpane-active')

    await this.setFormFieldValue('CSS Editor', css, cssTab)
    await this.waitForProgressBar()
  }
}

export const test = base.extend<{ builderPage: CssBuilderPage }>({
  builderPage: async ({ page }, use) => {
    const builderPage = new CssBuilderPage(page)

    await use(builderPage)
  },
})
