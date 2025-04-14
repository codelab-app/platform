import { BasePage } from '../setup/core/page'
import { baseTest } from '../setup/fixtures/base.fixture'

export class ProductionPage extends BasePage {
  async goto() {
    await this.page.goto('https://production-demo-app.sites.codelab.app/')
  }
}

export const test = baseTest.extend<{ productionPage: ProductionPage }>({
  productionPage: async ({ context, page }, use) => {
    const productionPage = new ProductionPage(page, context)

    await use(productionPage)
  },
})
