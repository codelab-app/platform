import { BasePage } from '../setup/core/page'
import { baseTest } from '../setup/fixtures/base.fixture'

export class ProductionPage extends BasePage {
  async goto() {
    await this.page.goto('https://production-demo-app.sites.codelab.app/')
  }
}

export const test = baseTest.extend<{ productionPage: ProductionPage }>({
  productionPage: async ({ browserContext, page }, use) => {
    const productionPage = new ProductionPage(page, browserContext)

    await use(productionPage)
  },
})
