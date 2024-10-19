import { test as base, expect } from '@playwright/test'

import { BuilderPage } from '../builder/builder.fixture'
import {
  childMapperComponent,
  pageRowChild1,
  pageRowChild2,
  pageRowElement,
} from './child-mapper.data'

/**
 * Follow guide https://medium.com/@lucgagan/mastering-playwright-best-practices-for-web-automation-with-the-page-object-model-3541412b03d1
 */
export class ChildMapperPage extends BuilderPage {
  async changeChildMapperProps() {
    const updateElementForm = this.getUpdateElementForm()

    await this.selectTreeElement(pageRowElement)
    await updateElementForm
      .locator('.ant-collapse-header', { hasText: 'Child Mapper' })
      .click()

    await this.setFormFieldValue(
      'Prop Key',
      '{{[{ name: "updated test 1" }, { name: "updated test 2" }]}}',
      updateElementForm,
    )
    await this.setFormFieldValue(
      'Render next to',
      pageRowChild2.name,
      updateElementForm,
    )
    await this.waitForSpinner()
  }

  async checkBuilderOutput() {
    await this.checkBuilderOutputStructure([
      '',
      'text test 1',
      'text test 2',
      '',
    ])
  }

  async checkElementTree() {
    await this.checkElementTreeStructure([
      'Body',
      'Row',
      'Child 1',
      'Component Name 0',
      'Component Name 1',
      'Child 2',
    ])
  }

  async checkEmptyBuilderOutput() {
    await this.checkBuilderOutputStructure(['', ''])
  }

  async checkEmptyElementTree() {
    await this.checkElementTreeStructure(['Body', 'Row', 'Child 1', 'Child 2'])
  }

  async checkUpdatedBuilderOutput() {
    await this.checkBuilderOutputStructure([
      '',
      '',
      'updated test 1',
      'updated test 2',
    ])
  }

  async checkUpdatedElementTree() {
    await this.checkElementTreeStructure([
      'Body',
      'Row',
      'Child 1',
      'Child 2',
      'Component Name 0',
      'Component Name 1',
    ])
  }

  async expandElementsTree() {
    const row = this.getTreeElement(pageRowElement.name, pageRowElement.atom)
    const col1 = this.getTreeElement(pageRowChild1.name, pageRowChild1.atom)
    const col2 = this.getTreeElement(pageRowChild2.name, pageRowChild2.atom)

    await this.page.getByLabel('plus-square').click()
    await expect(row).toBeVisible()

    await this.page.getByLabel('plus-square').click()
    await expect(col1).toBeVisible()
    await expect(col2).toBeVisible()
  }

  async setChildMapperProperties() {
    const updateElementForm = this.getUpdateElementForm()

    await this.selectTreeElement(pageRowElement)
    await updateElementForm
      .locator('.ant-collapse-header', { hasText: 'Child Mapper' })
      .click()

    await updateElementForm.locator('button', { hasText: 'JS' }).click()

    await this.setFormFieldValue(
      'Prop Key',
      '{{[{ name: "test 1" }, { name: "test 2" }]}}',
      updateElementForm,
    )
    await this.setFormFieldValue(
      'Component',
      childMapperComponent.name,
      updateElementForm,
    )
    await this.setFormFieldValue(
      'Render next to',
      pageRowChild1.name,
      updateElementForm,
    )

    await this.waitForSpinner()
  }

  async setEmptyChildMapperProperties() {
    const updateElementForm = this.getUpdateElementForm()

    await this.selectTreeElement(pageRowElement)
    await updateElementForm
      .locator('.ant-collapse-header', { hasText: 'Child Mapper' })
      .click()
    await this.setFormFieldValue('Prop Key', '{{[]}}', updateElementForm)
    await this.waitForSpinner()
  }

  async setNonArrayChildMapperProperties() {
    const updateElementForm = this.getUpdateElementForm()

    await this.selectTreeElement(pageRowElement)
    await updateElementForm
      .locator('.ant-collapse-header', { hasText: 'Child Mapper' })
      .click()
    await this.setFormFieldValue('Prop Key', '{{false}}', updateElementForm)
    await this.waitForSpinner()
  }

  private async checkBuilderOutputStructure(expectedContent: Array<string>) {
    const outputContainer = this.getBuilderRenderContainer()
    const antDesignRow = outputContainer.locator('.ant-row')
    const rowChildren = outputContainer.locator('.ant-row > *')

    await expect(antDesignRow).toBeVisible()
    await expect(rowChildren).toHaveCount(expectedContent.length)

    for (let i = 0; i < expectedContent.length; i++) {
      const renderedElement = rowChildren.nth(i)
      const content = expectedContent[i]

      await expect(renderedElement).toContainText(content!)
    }
  }
}

export const test = base.extend<{ builderPage: ChildMapperPage }>({
  builderPage: async ({ page }, use) => {
    const builderPage = new ChildMapperPage(page)

    await use(builderPage)
  },
})
