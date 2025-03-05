import { type IApp } from '@codelab/shared/abstract/core'
import { providerPageId } from '@codelab/shared/data/test'
import { expect } from '@playwright/test'

import { globalBeforeAll } from '../../setup/before-all'
import { seedTestData, textContent } from './convert-element-to-component.data'
import { test } from './convert-element-to-component.fixture'

let app: IApp

test.describe.configure({ mode: 'serial' })

globalBeforeAll()

test.beforeAll(async ({ request }, testInfo) => {
  app = await seedTestData(request)
})

test('should convert the element into a component and create an instance of it', async ({
  builderPage: page,
}) => {
  await page.goto(app.id, providerPageId)
  await page.checkPageHeaderTitle(['Codelab App', 'Pages', 'provider'])

  await expect(page.getSpinner()).toBeHidden()
  await expect(page.getBuilderRenderContainer()).toContainText(textContent)

  await page.convertElementToComponent()
  await page.goToComponentBuilderPage()
  await page.checkComponentHasCorrectElements()
})
