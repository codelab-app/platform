import { type IApp } from '@codelab/shared-abstract-core'
import { providerPageId } from '@codelab/shared-data-test'
import { expect } from '@playwright/test'

import { globalBeforeAll } from '../../setup/before-all'
import {
  FONT_SIZE,
  googleFontsElement,
  seedTestData,
} from './google-fonts.data'
import { test } from './google-fonts.fixture'

let app: IApp

test.describe.configure({ mode: 'serial' })

globalBeforeAll()

test.beforeAll(async ({ request }, testInfo) => {
  app = await seedTestData(request)
})

test.beforeEach(async ({ builderPage: page }) => {
  await page.goto(app.id, providerPageId)
  await page.checkPageHeaderTitle(['Codelab App', 'Pages', 'provider'])

  await expect(page.getSpinner()).toBeHidden()
  await expect(page.getFormFieldSpinner()).toHaveCount(0)
})

test('should create Google Fonts component and setup fonts on the _app page', async ({
  builderPage: page,
}) => {
  const expectedLinkTag = page.page.locator('#render-root link')

  await page.createElementTree([googleFontsElement])
  await page.selectTreeElement(googleFontsElement)
  await page.openPropsTab()
  await page.addFontProps()

  await expect(expectedLinkTag).toHaveAttribute(
    'href',
    `https://fonts.googleapis.com/css2?family=Montserrat:wght@${FONT_SIZE}&display=swap`,
  )
})

test('should apply selected fonts to text', async ({ builderPage: page }) => {
  await expect(page.getOutputTextNode()).toHaveText('Testing fonts')

  const initialStyle = await page.getOutputTextNode().evaluate((element) => {
    return window.getComputedStyle(element)
  })

  expect(initialStyle).not.toHaveProperty('fontFamily', 'Montserrat')
  expect(initialStyle).toHaveProperty('fontWeight', '500')

  await page.applyFonts()

  await expect(page.getSpinner()).toBeHidden()

  const updatedStyle = await page
    .getOutputTextNode()
    .evaluate((element) => window.getComputedStyle(element))

  expect(updatedStyle).toHaveProperty('fontFamily', 'Montserrat')
  expect(updatedStyle).toHaveProperty('fontWeight', '700')
})
