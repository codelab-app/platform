import { expect } from '@playwright/test'

import { BasePage } from '../setup/core/page'
import { baseTest } from '../setup/fixtures/base.fixture'

export class HomePage extends BasePage {
  async expectPageTitle(title: string) {
    await expect(this.page).toHaveTitle(title)
  }
}

export const test = baseTest.extend<{ homePage: HomePage }>({
  homePage: async ({ browserContext, page }, use) => {
    const homePage = new HomePage(page, browserContext)

    await use(homePage)
  },
})
