import { PageType } from '@codelab/frontend/abstract/types'
import { expect, test as base } from '@playwright/test'
import { BuilderPage } from '../builder/builder.fixture'
import {
  componentName,
  elementContainer,
} from './convert-element-to-component.data'

/**
 * Follow guide https://medium.com/@lucgagan/mastering-playwright-best-practices-for-web-automation-with-the-page-object-model-3541412b03d1
 */
export class ConvertElementToComponentPage extends BuilderPage {
  async convertElementToComponent() {
    const treeElement = await this.selectTreeElement(elementContainer)

    await treeElement.click({ button: 'right' })
    await this.page.getByText('Convert To Component').click()
    await this.clickModalConfirmButton()

    await expect(this.getGlobalProgressBar()).toBeHidden()
    await expect(this.getNotification()).toHaveText('Element deleted')
    await expect(treeElement).toBeHidden()
  }

  async goToComponentBuilderPage() {
    await this.page.goto(PageType.Components())

    await expect(this.getCard({ name: componentName })).toBeVisible()

    const card = this.getCard({ name: componentName })

    await card.locator(this.getButton({ label: 'Edit in Builder' })).click()

    await expect(this.getSpinner()).toBeHidden()
  }
}

export const test = base.extend<{
  builderPage: ConvertElementToComponentPage
}>({
  builderPage: async ({ page }, use) => {
    const builderPage = new ConvertElementToComponentPage(page)

    await use(builderPage)
  },
})
