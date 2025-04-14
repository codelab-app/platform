import { expect } from '@playwright/test'

import { baseTest } from '../../setup/fixtures/base.fixture'
import { BuilderPage } from '../builder/builder.fixture'

/**
 * Follow guide https://medium.com/@lucgagan/mastering-playwright-best-practices-for-web-automation-with-the-page-object-model-3541412b03d1
 */
export class CssBuilderPage extends BuilderPage {
  getStyledButton() {
    return this.getBuilderRenderContainer().locator('.ant-btn').first()
  }

  async openCssTab() {
    return test.step('openCssTab', async () => {
      const cssTab = this.page.locator('[data-node-key="CSS"]')

      await cssTab.click()

      await expect(cssTab).toHaveClass('ant-tabs-tab ant-tabs-tab-active')
    })
  }

  async setGuiStyling() {
    return test.step('setGuiStyling', async () => {
      const displyNoneButton = this.page.locator(
        '[data-test-id="gui-display"] [title="None"]',
      )

      await displyNoneButton.click()
      await this.waitForProgressBar()
    })
  }

  async typeIntoCssEditor(css: string) {
    return test.step('typeIntoCssEditor', async () => {
      const cssTab = this.page.locator('.ant-tabs-tabpane-active')

      await this.fillInputText({ label: 'Css Editor' }, css, {
        locator: cssTab,
        waitForAutosave: true,
      })
    })
  }
}

export const test = baseTest.extend<{ builderPage: CssBuilderPage }>({
  builderPage: async ({ context, page }, use) => {
    const builderPage = new CssBuilderPage(page, context)

    await use(builderPage)
  },
})
