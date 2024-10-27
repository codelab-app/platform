import { expect } from '@playwright/test'

import { test } from './component.fixture'

test.describe.configure({ mode: 'serial' })

test.beforeEach(async ({ componentListPage: page }) => {
  await page.goto()

  await expect(page.getSpinner()).toBeHidden()
})

test('should be able to create component', async ({
  componentListPage: page,
}) => {
  await page.expectPreexistingComponents()
  await page.expectPreexistingAtoms()

  await page.openCreateComponentPanel()
  await page.fillCreateComponentForm()

  await expect(page.getComponentName()).toBeVisible()
})

test('should be able to delete component', async ({
  componentListPage: page,
}) => {
  await page.openDeleteComponentModal()
  await page.clickModalConfirmButton()

  await expect(page.getComponentName()).toBeHidden()
})
