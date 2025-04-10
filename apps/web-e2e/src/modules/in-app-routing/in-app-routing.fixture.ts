import { expect } from '@playwright/test'

import { baseTest } from '../../setup/fixtures/base.fixture'
import { BuilderPage } from '../builder/builder.fixture'
import {
  providerPageLinkElement,
  staticPageLinkElement,
  staticPageTextElement,
  testUrlProps,
} from './in-app-routing.data'

/**
 * Follow guide https://medium.com/@lucgagan/mastering-playwright-best-practices-for-web-automation-with-the-page-object-model-3541412b03d1
 */
export class InAppRoutingPage extends BuilderPage {
  async clickDynamicPageNavigationLink() {
    await this.getDynamicPageLink().click()
  }

  async clickStatickPageNavigationLink() {
    await this.getStaticPageLink().click()
  }

  getDynamicPageLink() {
    const text = staticPageLinkElement.propsData?.children.value
    const outputContainer = this.getBuilderRenderContainer()

    return outputContainer.getByRole('link', { name: text })
  }

  getStaticPageLink() {
    const text = providerPageLinkElement.propsData?.children.value
    const outputContainer = this.getBuilderRenderContainer()

    return outputContainer.getByRole('link', { name: text })
  }

  async waitForDynamicPageLinkToAppear() {
    await expect(this.getDynamicPageLink()).toBeVisible()
  }

  async waitForDynamicPageToAppear() {
    const outputContainer = this.getBuilderRenderContainer()

    await expect(outputContainer).toContainText(
      `testId: "${testUrlProps.testId}", subtestId: "${testUrlProps.subtestId}"`,
    )
  }

  async waitForStaticPageLinkToAppear() {
    await expect(this.getStaticPageLink()).toBeVisible()
  }

  async waitForStaticPageToAppear() {
    const outputContainer = this.getBuilderRenderContainer()

    await expect(outputContainer).toContainText(
      staticPageTextElement.propsData?.children.value,
    )
  }
}

export const test = baseTest.extend<{ builderPage: InAppRoutingPage }>({
  builderPage: async ({ browserContext, page }, use) => {
    const builderPage = new InAppRoutingPage(page, browserContext)

    await use(builderPage)
  },
})
