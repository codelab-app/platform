import { test as base } from '@playwright/test'

import { BasePage } from '../setup/locators/pages'

export class ProductionPage extends BasePage {
  async goto() {
    await this.page.goto('https://production-demo-app.sites.codelab.app/')
  }
}

export const test = base.extend<{ productionPage: ProductionPage }>({
  productionPage: async ({ page }, use) => {
    const productionPage = new ProductionPage(page)

    await use(productionPage)
  },
})
