import { type IApp } from '@codelab/shared/abstract/core'
import { expect } from '@playwright/test'
import { builderElements, pageId, seedTestData } from './state-sharing.data'
import { test } from './state-sharing.fixture'

let app: IApp

test.describe.configure({ mode: 'serial' })

test.beforeAll(async ({ request }, testInfo) => {
  // db reset, app seed and test data seed may sometimes take longer than default 60s
  test.setTimeout(testInfo.timeout + 30000)

  app = await seedTestData(request)
})

test('should setup the pages that will share states', async ({
  builderPage: page,
}) => {
  await page.goToComponentBuilder()
  await page.checkPageHeaderTitle(['Components'])

  await expect(page.getSpinner()).toBeHidden()
  await expect(page.getFormFieldSpinner()).toHaveCount(0)

  await page.expandElementsTree()
  await page.setComponentElementText()
  await page.openPreview()

  await expect(page.getBuilderRenderContainer()).toHaveText('text undefined')

  await page.openBuilder()
  await page.createStateVariable('component state value')
  await page.openPreview()

  await expect(page.getBuilderRenderContainer()).toHaveText(
    'text component state value',
  )
})

/**
 * We'll keep the UI methods for state since we don't have other specs for state
 */
test('should create a state variable in the provider page', async ({
  builderPage: page,
}) => {
  await page.goto(app.id, app.pages[0]!.id)
  await page.checkPageHeaderTitle(['Codelab App', 'Pages', '_app'])

  await expect(page.getSpinner()).toBeHidden()

  await page.createStateVariable('provider state value')
})

/**
 * Originally had this spec to use provider state, but component data should be bound and passed in, as opposed to accessing global state.
 */
test('should use component state and not use provider state', async ({
  builderPage: page,
}) => {
  await page.goto(app.id, pageId)
  await page.checkPageHeaderTitle(['Codelab App', 'Pages', 'Test Page'])

  await expect(page.getSpinner()).toBeHidden()

  await page.createElementTree(builderElements)
  await page.openPreview()

  await expect(page.getBuilderRenderContainer()).toHaveText(
    'text component state value',
  )
})
