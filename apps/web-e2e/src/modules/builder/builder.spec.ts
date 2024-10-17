import type { IAppDto } from '@codelab/shared/abstract/core'

import { expect } from '@playwright/test'

import {
  builderElements,
  elementColA,
  elementColB,
  elementColC,
  seedTestData,
} from './builder.data'
import { test } from './builder.fixture'

let app: IAppDto

test.describe.configure({ mode: 'serial' })

test.beforeAll(async ({ request }, testInfo) => {
  // db reset, app seed and test data seed may sometimes take longer than default 60s
  test.setTimeout(testInfo.timeout + 30000)

  app = await seedTestData(request)
})

test.beforeEach(async ({ builderPage: page }) => {
  await page.goto(app.id, app.pages![0]!.id)
  await page.checkPageHeaderTitle(['Codelab App', 'Pages', 'provider'])

  await expect(page.getSpinner()).toBeHidden()
})

test('should be able to create element tree', async ({ builderPage: page }) => {
  await page.checkRootElementExists()
  await page.createElementTree(builderElements)
  await page.checkBuilderOutput()

  await expect(page.getNotification()).toBeHidden()
})

test('should be able to update element', async ({ builderPage: page }) => {
  await page.updateBuilderElement()
  await page.checkBuilderIsUpdated()

  await expect(page.getNotification()).toBeHidden()
})

test('should be able to delete element subtree', async ({
  builderPage: page,
}) => {
  const colAElement = page.getTreeElement(elementColA.name, elementColA.atom)
  const colBElement = page.getTreeElement(elementColB.name, elementColB.atom)
  const colCElement = page.getTreeElement(elementColC.name, elementColC.atom)

  await expect(colAElement).toBeVisible()
  await expect(colBElement).toBeVisible()
  await expect(colCElement).toBeVisible()

  await page.deleteElementByContextMenu(elementColA)
  await page.deleteElementFromUpdateForm(elementColB)
  await page.deleteElementFromOverlay(elementColC)

  await expect(colAElement).toBeHidden()
  await expect(colBElement).toBeHidden()
  await expect(colCElement).toBeHidden()
  await expect(page.getNotification()).toBeHidden()
})
