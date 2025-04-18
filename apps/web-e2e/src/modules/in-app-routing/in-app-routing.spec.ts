import { type IApp } from '@codelab/shared-abstract-core'
import { providerPageId } from '@codelab/shared/data/test'
import { expect } from '@playwright/test'

import { globalBeforeAll } from '../../setup/before-all'
import { seedTestData } from './in-app-routing.data'
import { test } from './in-app-routing.fixture'

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

test('should navigate to the static and dynamic pages when NextLink is clicked', async ({
  builderPage: page,
}) => {
  // should not allow link navigation in builder mode
  await expect(page.getStaticPageLink()).toHaveAttribute('href', '#')

  await page.openPreview()
  await page.waitForStaticPageLinkToAppear()
  await page.clickStatickPageNavigationLink()
  await page.waitForStaticPageToAppear()
  await page.openBuilder()
  await page.checkPageHeaderTitle(['Codelab App', 'Pages', 'Test Page'])

  // should not allow link navigation in builder mode
  await expect(page.getDynamicPageLink()).toHaveAttribute('href', '#')

  await page.openPreview()
  await page.waitForDynamicPageLinkToAppear()
  await page.clickDynamicPageNavigationLink()
  await page.waitForDynamicPageToAppear()
  await page.checkPageHeaderTitle(['Codelab App', 'Pages', 'Dynamic Page'])
})
