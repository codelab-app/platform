import { IConfigPaneTab } from '@codelab/shared-abstract-core'
import { expect } from '@playwright/test'

import { baseTest } from '../../setup/fixtures/base.fixture'
import { CssBuilderPage } from '../css/css.fixture'
import { FONT_NAME, FONT_SIZE, typographyElement } from './google-fonts.data'

/**
 * Follow guide https://medium.com/@lucgagan/mastering-playwright-best-practices-for-web-automation-with-the-page-object-model-3541412b03d1
 */
export class GoogleFontsPage extends CssBuilderPage {
  async addFontProps() {
    return test.step('addFontProps', async () => {
      const fontLazyOption = this.page.locator(
        `.ant-select-item[title="${FONT_NAME}"]`,
      )

      await this.page.locator('button span[aria-label="plus-square"]').click()
      await this.page.locator('div[name="fonts.0.type"]').click()
      await this.page.locator('.ant-select-item-option-active').hover()
      await this.scrollUntilElementIsVisible(fontLazyOption)
      await this.page.locator(`.ant-select-item[title="${FONT_NAME}"]`).click()
      await this.page.locator('div[id="fonts.0.value.weight"]').click()
      await this.page.locator(`.ant-select-item[title="${FONT_SIZE}"]`).click()
      await this.waitForProgressBar()
    })
  }

  async applyFonts() {
    return test.step('applyFonts', async () => {
      await this.selectTreeElement(typographyElement)
      await this.openCssTab()

      await this.page.locator('div[aria-label="Font"]').click()
      await this.page.locator('.ant-select-item[title="Montserrat"]').click()
      await this.waitForProgressBar()
    })
  }

  getOutputTextNode() {
    return this.getBuilderRenderContainer().locator('.ant-typography')
  }

  async openPropsTab() {
    return test.step('openPropsTab', async () => {
      const cssTab = this.page.locator(
        `[data-node-key="${IConfigPaneTab.Props}"]`,
      )

      await cssTab.click()

      await expect(cssTab).toHaveClass('ant-tabs-tab ant-tabs-tab-active')
      await expect(this.getSpinner()).toBeHidden()
    })
  }
}

export const test = baseTest.extend<{ builderPage: GoogleFontsPage }>({
  builderPage: async ({ context, page }, use) => {
    const builderPage = new GoogleFontsPage(page, context)

    await use(builderPage)
  },
})
