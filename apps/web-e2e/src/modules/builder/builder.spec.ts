import type { IAppDto } from '@codelab/shared/abstract/core'

import { IAtomType } from '@codelab/shared/abstract/core'
import { providerPageId } from '@codelab/shared/data/test'
import { expect } from '@playwright/test'

import { globalBeforeAll } from '../../setup/before-all'
import { seedAppData } from '../app/app.data'
import {
  builderElements,
  elementColA,
  elementColB,
  elementColC,
} from './builder.data'
import { test } from './builder.fixture'

let app: IAppDto

test.describe.configure({ mode: 'serial', timeout: 60000 })

globalBeforeAll()

test.beforeAll(async ({ request }) => {
  app = await seedAppData(request, {
    atomTypes: [
      IAtomType.AntDesignGridRow,
      IAtomType.AntDesignGridCol,
      IAtomType.AntDesignTypographyText,
      IAtomType.AntDesignButton,
    ],
    componentTypes: [],
  })
})

test.beforeEach(async ({ builderPage: page }, testInfo) => {
  await page.goto(app.id, providerPageId)
  await page.checkPageHeaderTitle(['Codelab App', 'Pages', 'provider'])

  await expect(page.getSpinner()).toBeHidden()
  await expect(page.getFormFieldSpinner()).toHaveCount(0)
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
