import { type IApp } from '@codelab/shared-abstract-core'
import { providerPageId } from '@codelab/shared-data-test'
import { expect } from '@playwright/test'

import { globalBeforeAll } from '../../setup/before-all'
import {
  pageName,
  regularPageId,
  seedTestData,
} from './provider-page-content-container.data'
import { test } from './provider-page-content-container.fixture'

let app: IApp

test.describe.configure({ mode: 'serial' })

globalBeforeAll()

test.beforeAll(async ({ request }, testInfo) => {
  app = await seedTestData(request)
})

test('should set card element as a container for child pages in the provider page', async ({
  builderPage: page,
}) => {
  await page.goto(app.id, providerPageId)
  await page.checkPageHeaderTitle(['Codelab App', 'Pages', 'provider'])

  await expect(page.getSpinner()).toBeHidden()

  await page.openPageSettingsTab()
  await page.setPageContentContainer()
  await page.goto(app.id, regularPageId)
  await page.checkPageHeaderTitle(['Codelab App', 'Pages', pageName])
  await page.openPreview()

  await page.checkPageIsInsideProviderPageContainer()
})
