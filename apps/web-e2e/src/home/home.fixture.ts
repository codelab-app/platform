import { expect, type Page, test as base } from '@playwright/test'
import { BasePage } from '../locators/pages'

export class HomePage extends BasePage {
  async expectPageTitle(title: string) {
    await expect(this.page).toHaveTitle(title)
  }
}

export const test = base.extend<{ homePage: HomePage }>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page)

    await use(homePage)
  },
})
