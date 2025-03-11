import { expect } from '@playwright/test'

import { baseTest } from '../setup/fixtures/base.fixture'
import { BasePage } from '../setup/locators/pages'

export class HomePage extends BasePage {
  async expectPageTitle(title: string) {
    await expect(this.page).toHaveTitle(title)
  }
}

export const test = baseTest.extend<{ homePage: HomePage }>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page)

    await use(homePage)
  },
})
