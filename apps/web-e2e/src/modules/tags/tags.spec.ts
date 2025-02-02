import { expect } from '@playwright/test'

import { globalBeforeAll } from '../../setup/before-all'
import { CreateData, UpdateData } from './tags.data'
import { test } from './tags.fixture'

test.describe.configure({ mode: 'serial' })

globalBeforeAll()

test.beforeEach(async ({ tagListPage: page }) => {
  await page.goto()

  await expect(page.getSpinner()).toBeHidden()
  await expect(page.getSkeleton()).toBeHidden()

  await page.checkPageHeaderTitle(['Tags'])
})

test('should be able to create tags', async ({ tagListPage: page }) => {
  await page.createTag(CreateData.tag_0)

  await expect(page.getTreeTagItem(CreateData.tag_0)).toBeVisible()

  await page.createTag(CreateData.tag_1)

  await expect(page.getTreeTagItem(CreateData.tag_1)).toBeVisible()

  await page.createTag(CreateData.tag_0_0, CreateData.tag_0)

  await expect(page.getTreeTagItem(CreateData.tag_0_0)).toBeVisible()

  await page.createTag(CreateData.tag_1_0, CreateData.tag_1)

  await expect(page.getTreeTagItem(CreateData.tag_1_0)).toBeVisible()
})

test('should be able to update tags', async ({ tagListPage: page }) => {
  await page.updateTag(CreateData.tag_0, UpdateData.tag_0)

  await expect(page.getTreeTagItem(CreateData.tag_0)).toBeHidden()
  await expect(page.getTreeTagItem(UpdateData.tag_0)).toBeVisible()
})

test('should be able to delete a tag inside its parent', async ({
  tagListPage: page,
}) => {
  // should be able to delete tag inside parent
  await page.expandTagTree()
  await page.deleteTagNodeInTree(CreateData.tag_0_0)

  await expect(page.getTreeTagItem(CreateData.tag_0_0)).toBeHidden()

  // should be able to delete root tag without children
  await page.deleteTagNodeInTree(UpdateData.tag_0)

  await expect(page.getTreeTagItem(UpdateData.tag_0)).toBeHidden()

  // should be able to delete root tag with children
  await page.deleteTagNodeInTree(CreateData.tag_1)

  await expect(page.getTreeTagItem(CreateData.tag_1)).toBeHidden()
  await expect(page.getTreeTagItem(CreateData.tag_1_0)).toBeHidden()
})
