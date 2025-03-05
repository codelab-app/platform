import { PageType } from '@codelab/frontend/abstract/types'
import { test as base, expect } from '@playwright/test'

import { BuilderPage } from '../builder/builder.fixture'
import {
  componentName,
  elementContainer,
  textContent,
} from './convert-element-to-component.data'

/**
 * Follow guide https://medium.com/@lucgagan/mastering-playwright-best-practices-for-web-automation-with-the-page-object-model-3541412b03d1
 */
export class ConvertElementToComponentPage extends BuilderPage {
  async checkComponentHasCorrectElements() {
    return test.step('checkComponentHasCorrectElements', async () => {
      await expect(this.getBuilderRenderContainer()).toContainText(textContent)

      await this.checkElementTreeStructure([
        'Container',
        'Row',
        'Column',
        'Text',
      ])
    })
  }

  async convertElementToComponent() {
    return test.step('convertElementToComponent', async () => {
      await this.page.locator('.ant-tree-switcher_close').click()

      const treeElement = await this.selectTreeElement(elementContainer)

      const newComponentElement = this.getTreeElement(
        'Container',
        'instance of Container',
      )

      await treeElement.click({ button: 'right' })
      await this.page.getByText('Convert To Component').click()

      await expect(this.getGlobalProgressBar()).toBeHidden()
      await expect(treeElement).toBeHidden()
      await expect(newComponentElement).toBeVisible()
      await expect(this.getBuilderRenderContainer()).toHaveText(textContent)
    })
  }

  async goToComponentBuilderPage() {
    return test.step('goToComponentBuilderPage', async () => {
      await this.page.goto(PageType.Components())

      await expect(this.getCard({ name: componentName })).toBeVisible()

      const card = this.getCard({ name: componentName })

      await card.locator(this.getButton({ title: 'Edit in Builder' })).click()

      await expect(this.getSpinner()).toBeHidden()
    })
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
