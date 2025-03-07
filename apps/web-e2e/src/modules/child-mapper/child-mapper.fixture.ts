import { test as base, expect } from '@playwright/test'

import { BuilderPage } from '../builder/builder.fixture'
import {
  childMapperComponentName,
  pageRowChild1,
  pageRowChild2,
  pageRowElement,
} from './child-mapper.data'

/**
 * Follow guide https://medium.com/@lucgagan/mastering-playwright-best-practices-for-web-automation-with-the-page-object-model-3541412b03d1
 */
export class ChildMapperPage extends BuilderPage {
  async changeChildMapperProps() {
    return test.step('changeChildMapperProps', async () => {
      const updateElementForm = this.getUpdateElementForm()

      await this.selectTreeElement(pageRowElement)
      await expect(this.getFormFieldSpinner()).toHaveCount(0)

      await this.fillInputText(
        { label: 'Prop Key' },
        '{{[{ name: "updated test 1" }, { name: "updated test 2" }]}}',
        { locator: updateElementForm, waitForAutosave: true },
      )
      await this.fillInputText(
        { label: 'Render next to' },
        pageRowChild2.name,
        {
          locator: updateElementForm,
          waitForAutosave: true,
        },
      )
    })
  }

  async checkBuilderOutput() {
    return test.step('checkBuilderOutput', async () => {
      await this.checkBuilderOutputStructure([
        '',
        'text test 1',
        'text test 2',
        '',
      ])
    })
  }

  async checkElementTree() {
    return test.step('checkElementTree', async () => {
      await this.checkElementTreeStructure([
        'Body',
        'Row',
        'Child 1',
        'Component Name 0',
        'Component Name 1',
        'Child 2',
      ])
    })
  }

  async checkEmptyBuilderOutput() {
    return test.step('checkEmptyBuilderOutput', async () => {
      await this.checkBuilderOutputStructure(['', ''])
    })
  }

  async checkEmptyElementTree() {
    return test.step('checkEmptyElementTree', async () => {
      await this.checkElementTreeStructure([
        'Body',
        'Row',
        'Child 1',
        'Child 2',
      ])
    })
  }

  async checkUpdatedBuilderOutput() {
    return test.step('checkUpdatedBuilderOutput', async () => {
      await this.checkBuilderOutputStructure([
        '',
        '',
        'updated test 1',
        'updated test 2',
      ])
    })
  }

  async checkUpdatedElementTree() {
    return test.step('checkUpdatedElementTree', async () => {
      await this.checkElementTreeStructure([
        'Body',
        'Row',
        'Child 1',
        'Child 2',
        'Component Name 0',
        'Component Name 1',
      ])
    })
  }

  async expandElementsTree() {
    return test.step('expandElementsTree', async () => {
      await this.page.locator('.ant-tree-switcher_close').click()

      const row = this.getTreeElement(pageRowElement.name, pageRowElement.atom)

      await expect(row).toBeVisible()

      const switcher = this.page.locator('.ant-tree-switcher_close')

      await switcher.waitFor({ state: 'visible', timeout: 5000 })
      await switcher.click()

      const col1 = this.getTreeElement(pageRowChild1.name, pageRowChild1.atom)
      const col2 = this.getTreeElement(pageRowChild2.name, pageRowChild2.atom)

      await expect(col1).toBeVisible()
      await expect(col2).toBeVisible()
    })
  }

  async setChildMapperProperties() {
    return test.step('setChildMapperProperties', async () => {
      await this.selectTreeElement(pageRowElement)

      const updateElementForm = this.getUpdateElementForm()

      await updateElementForm
        .locator('.ant-collapse-header', { hasText: 'Child Mapper' })
        .click()

      await this.fillInputText(
        { label: 'Component' },
        childMapperComponentName,
        {
          locator: updateElementForm,
          waitForAutosave: true,
        },
      )

      await updateElementForm.locator('button', { hasText: 'JS' }).click()

      await this.fillInputText(
        { label: 'Prop Key' },
        '{{[{ name: "test 1" }, { name: "test 2" }]}}',
        { locator: updateElementForm, waitForAutosave: true },
      )

      await this.fillInputText(
        { label: 'Render next to' },
        pageRowChild1.name,
        {
          locator: updateElementForm,
          waitForAutosave: true,
        },
      )
    })
  }

  async setEmptyChildMapperProperties() {
    return test.step('setEmptyChildMapperProperties', async () => {
      const updateElementForm = this.getUpdateElementForm()

      await this.selectTreeElement(pageRowElement)
      await updateElementForm
        .locator('.ant-collapse-header', { hasText: 'Child Mapper' })
        .click()
      await this.fillInputText({ label: 'Prop Key' }, '{{[]}}', {
        locator: updateElementForm,
        waitForAutosave: true,
      })
    })
  }

  async setNonArrayChildMapperProperties() {
    return test.step('setNonArrayChildMapperProperties', async () => {
      const updateElementForm = this.getUpdateElementForm()

      await this.selectTreeElement(pageRowElement)
      await updateElementForm
        .locator('.ant-collapse-header', { hasText: 'Child Mapper' })
        .click()
      await this.fillInputText({ label: 'Prop Key' }, '{{false}}', {
        locator: updateElementForm,
        waitForAutosave: true,
      })
    })
  }

  private async checkBuilderOutputStructure(expectedContent: Array<string>) {
    return test.step('checkBuilderOutputStructure', async () => {
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
    })
  }
}

export const test = base.extend<{ builderPage: ChildMapperPage }>({
  builderPage: async ({ page }, use) => {
    const builderPage = new ChildMapperPage(page)

    await use(builderPage)
  },
})
