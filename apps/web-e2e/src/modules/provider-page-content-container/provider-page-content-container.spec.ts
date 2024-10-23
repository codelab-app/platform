import { type IApp } from '@codelab/shared/abstract/core'
import { expect } from '@playwright/test'

import {
  pageId,
  pageName,
  seedTestData,
} from './provider-page-content-container.data'
import { test } from './provider-page-content-container.fixture'

let app: IApp

test.describe.configure({ mode: 'serial' })

test.beforeAll(async ({ request }, testInfo) => {
  // db reset, app seed and test data seed may sometimes take longer than default 60s
  test.setTimeout(testInfo.timeout + 30000)

  app = await seedTestData(request)
})

test('should set card element as a container for child pages in the provider page', async ({
  builderPage: page,
}) => {
  await page.goto(app.id, app.pages![0]!.id)
  await page.checkPageHeaderTitle(['Codelab App', 'Pages', 'provider'])

  await expect(page.getSpinner()).toBeHidden()

  await page.openPageSettingsTab()
  await page.setPageContentContainer()
  await page.goto(app.id, pageId)
  await page.checkPageHeaderTitle(['Codelab App', 'Pages', pageName])

  await page.checkPageIsInsideProviderPageContainer()
})
