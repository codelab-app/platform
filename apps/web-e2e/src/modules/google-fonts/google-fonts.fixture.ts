import { test as base, expect } from '@playwright/test'

import { CssBuilderPage } from '../css/css.fixture'
import { FONT_NAME, FONT_SIZE, typographyElement } from './google-fonts.data'

/**
 * Follow guide https://medium.com/@lucgagan/mastering-playwright-best-practices-for-web-automation-with-the-page-object-model-3541412b03d1
 */
export class GoogleFontsPage extends CssBuilderPage {
  async addFontProps() {
    const fontLazyOption = this.page.locator(
      `.ant-select-item[title="${FONT_NAME}"]`,
    )

    await this.page.locator('button span[aria-label="plus-square"]').click()
    await this.page.locator('div[name="fonts.0.type"]').click()
    await this.page.locator('.ant-select-item-option-active').hover()
    await this.scrollUntilElementIsVisible(fontLazyOption)
    await this.page.locator(`.ant-select-item[title="${FONT_NAME}"]`).click()
    await this.page.locator('div[name="value.weight"]').click()
    await this.page.locator(`.ant-select-item[title="${FONT_SIZE}"]`).click()
    await this.waitForProgressBar()
  }

  async applyFonts() {
    await this.selectTreeElement(typographyElement)
    await this.openCssTab()

    await this.page.locator('div[aria-label="Font"]').click()
    await this.page.locator('.ant-select-item[title="Montserrat"]').click()
    await this.waitForProgressBar()
  }

  getOutputTextNode() {
    return this.getBuilderRenderContainer().locator('.ant-typography')
  }

  async openPropsTab() {
    const cssTab = this.page.locator('[data-node-key="Props"]')

    await cssTab.click()

    await expect(cssTab).toHaveClass('ant-tabs-tab ant-tabs-tab-active')
    await expect(this.getSpinner()).toBeHidden()
  }
}

export const test = base.extend<{ builderPage: GoogleFontsPage }>({
  builderPage: async ({ page }, use) => {
    const builderPage = new GoogleFontsPage(page)

    await use(builderPage)
  },
})
