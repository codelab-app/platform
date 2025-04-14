import { type IApp } from '@codelab/shared/abstract/core'
import { expect } from '@playwright/test'

import { globalBeforeAll } from '../../setup/before-all'
import { seedTestData } from './load-test.data'
import { test } from './load-test.fixture'

let app: IApp

test.beforeAll(async ({ request }, testInfo) => {
  testInfo.setTimeout(150_000)

  app = await seedTestData(request)
})

test('should load "app list", "page list" and "page builder" pages', async ({
  builderPage: page,
}) => {
  test.setTimeout(120_000)

  await page.validateCanOpenAppListPage(app.name)
  await page.validateCanOpenPageListPage(app.name)
  await page.validateCanOpenPageBuilderPage()

  // no error notifications throughout the flow
  await expect(page.getNotification()).toBeHidden()
})
