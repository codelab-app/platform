import { type IApp } from '@codelab/shared/abstract/core'
import { providerPageId } from '@codelab/shared/data/test'
import { expect } from '@playwright/test'

import { globalBeforeAll } from '../../setup/before-all'
import { seedAppData } from '../builder/builder.data'
import {
  backgroundColor1,
  backgroundColor2,
  buttonElement,
  defaultColor,
  displayNone,
} from './css.data'
import { test } from './css.fixture'

let app: IApp

test.describe.configure({ mode: 'serial' })

globalBeforeAll()

test.beforeAll(async ({ request }, testInfo) => {
  app = await seedAppData(request)
})

test.beforeEach(async ({ builderPage: page }) => {
  await page.goto(app.id, providerPageId)
  await page.checkPageHeaderTitle(['Codelab App', 'Pages', 'provider'])

  await expect(page.getSpinner()).toBeHidden()
  await expect(page.getFormFieldSpinner()).toHaveCount(0)
})

test('should be able to set styling through css string and GUI', async ({
  builderPage: page,
}) => {
  await page.createElementTree([buttonElement])
  await page.selectTreeElement(buttonElement)
  await page.openCssTab()
  await page.typeIntoCssEditor(`background-color: ${backgroundColor1};`)

  await expect(page.getStyledButton()).toHaveCSS(
    'background-color',
    backgroundColor1,
  )

  await page.typeIntoCssEditor(' ')

  await expect(page.getStyledButton()).toHaveCSS(
    'background-color',
    defaultColor,
  )

  await page.typeIntoCssEditor(`background-color: ${backgroundColor2};`)

  await expect(page.getStyledButton()).toHaveCSS(
    'background-color',
    backgroundColor2,
  )

  await page.setGuiStyling()

  await expect(page.getStyledButton()).toHaveCSS('display', displayNone)
})

test('should persist styles after reload', async ({ builderPage: page }) => {
  await expect(page.getStyledButton()).toHaveCSS('display', displayNone)
  await expect(page.getStyledButton()).toHaveCSS(
    'background-color',
    backgroundColor2,
  )

  await expect(page.getNotification()).toBeHidden()
})
