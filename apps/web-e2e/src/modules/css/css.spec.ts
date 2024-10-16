import { type IApp } from '@codelab/shared/abstract/core'
import { expect } from '@playwright/test'
import {
  backgroundColor1,
  backgroundColor2,
  buttonElement,
  defaultColor,
  displayNone,
  seedTestData,
} from './css.data'
import { test } from './css.fixture'

let app: IApp

test.describe.configure({ mode: 'serial' })

test.beforeAll(async ({ request }, testInfo) => {
  // db reset, app seed and test data seed may sometimes take longer than default 60s
  test.setTimeout(testInfo.timeout + 30000)

  app = await seedTestData(request)
})

test.beforeEach(async ({ builderPage: page }) => {
  await page.goto(app.id, app.pages![0]!.id)
  await page.checkPageHeaderTitle(['Codelab App', 'Pages', '_app'])

  await expect(page.getSpinner()).toBeHidden()
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
