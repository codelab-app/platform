import { type IApp } from '@codelab/shared/abstract/core'
import { providerPageId } from '@codelab/shared/data/test'
import { expect } from '@playwright/test'

import { seedTestData } from './child-mapper.data'
import { test } from './child-mapper.fixture'

let app: IApp

test.describe.configure({ mode: 'serial' })

test.beforeAll(async ({ request }, testInfo) => {
  app = await seedTestData(request)
})

test.beforeEach(async ({ builderPage: page }) => {
  await page.goto(app.id, providerPageId)

  await expect(page.getSpinner()).toBeHidden()
  await expect(page.getFormFieldSpinner()).toHaveCount(0)
})

test('should be able to set child-mapper component', async ({
  builderPage: page,
}) => {
  await page.expandElementsTree()
  await page.setChildMapperProperties()
  await page.checkElementTree()
  await page.checkBuilderOutput()

  await expect(page.getNotification()).toBeHidden()
})

test('should render child-mapper component instances', async ({
  builderPage: page,
}) => {
  await page.checkElementTree()
  await page.checkBuilderOutput()
  await page.openPreview()
  await page.checkBuilderOutput()

  await expect(page.getNotification()).toBeHidden()
})

test('should render child-mapper component instances with updated props and in new location', async ({
  builderPage: page,
}) => {
  await page.changeChildMapperProps()
  await page.checkUpdatedElementTree()
  await page.checkUpdatedBuilderOutput()
  await page.openPreview()
  await page.checkUpdatedBuilderOutput()

  await expect(page.getNotification()).toBeHidden()
})

test('should not render instances when the prop array is empty', async ({
  builderPage: page,
}) => {
  await page.setEmptyChildMapperProperties()
  await page.checkEmptyBuilderOutput()
  await page.checkEmptyElementTree()
  await page.openPreview()
  await page.checkEmptyBuilderOutput()

  await expect(page.getNotification()).toBeHidden()
})

test('should not render instances when the prop is not an array', async ({
  builderPage: page,
}) => {
  await page.setNonArrayChildMapperProperties()
  await page.checkEmptyBuilderOutput()
  await page.checkEmptyElementTree()
  await page.openPreview()
  await page.checkEmptyBuilderOutput()

  await expect(page.getNotification()).toBeHidden()
})

// Disable temporarily so we can check the web page manually after spec runs
// test.afterAll('cleanup created components', async ({ request }) => {
//   await request.post('/api/v1/admin/setup-e2e-data')
// })
