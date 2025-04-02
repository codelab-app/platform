import { RoutePaths } from '@codelab/frontend/abstract/application'
import { expect } from '@playwright/test'

import { globalBeforeAll } from '../../setup/before-all'
import { test } from './resource.fixture'

test.describe.configure({ mode: 'serial' })

globalBeforeAll()

test.beforeEach(async ({ resourcePage: page }) => {
  await page.goto()

  await expect(page.getSpinner()).toBeHidden()
  await expect(page.getSkeleton()).toBeHidden()

  await page.checkPageHeaderTitle(['Resources'])
})

test('should be able to create resource', async ({ resourcePage: page }) => {
  await expect(page.getByExactText(page.resourceName)).toBeHidden()

  await page.createResource()
  await page.expectNotificationSuccess('Resource created successfully')
  await page.waitForPage(RoutePaths.Type.base())

  await expect(page.getByExactText(page.resourceName)).toBeVisible()
})

test('should be able to update resource name', async ({
  resourcePage: page,
}) => {
  await page.updateResource()

  await page.expectNotificationSuccess('Resource updated successfully')
  await page.waitForPage(RoutePaths.Resource.base())

  await expect(page.getByExactText(page.resourceName)).toBeHidden()
  await expect(page.getByExactText(page.updatedResourceName)).toBeVisible()
})

test('should be able to delete resource', async ({ resourcePage: page }) => {
  await page.deleteResource()

  await expect(page.getByExactText(page.resourceName)).toBeHidden()
  await expect(page.getByExactText(page.updatedResourceName)).toBeHidden()
})
