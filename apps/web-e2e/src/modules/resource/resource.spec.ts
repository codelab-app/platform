import { expect } from '@playwright/test'

import { test } from './recource.fixture'

test.describe.configure({ mode: 'serial' })

test.beforeEach(async ({ resourcePage: page }) => {
  await page.goto()

  await expect(page.getSpinner()).toBeHidden()
  await expect(page.getSkeleton()).toBeHidden()
})

test('should be able to create resource', async ({ resourcePage: page }) => {
  await expect(page.getTree().getTreeItem()).toHaveCount(0)

  await page.createResource()

  await expect(page.getTree().getTreeItem()).toHaveCount(1)
  await expect(page.getByExactText(page.resourceName)).toBeVisible()
})

test('should be able to update resource name', async ({
  resourcePage: page,
}) => {
  await page.updateResource()

  await expect(page.getByExactText(page.resourceName)).toBeHidden()
  await expect(page.getByExactText(page.updatedResourceName)).toBeVisible()
})

test('should be able to delete resource', async ({ resourcePage: page }) => {
  await page.deleteReosurce()

  await expect(page.getByExactText(page.resourceName)).toBeHidden()
  await expect(page.getByExactText(page.updatedResourceName)).toBeHidden()
})
