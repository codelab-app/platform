import { expect } from '@playwright/test'

import {
  arrayTypeName,
  enumTypeName,
  interfaceFieldName,
  interfaceTypeName,
  updatedArrayTypeName,
  updatedEnumTypeName,
  updatedInterfaceFieldName,
  updatedInterfaceTypeName,
} from './types.data'
import { test } from './types.fixture'

test.describe.configure({ mode: 'serial' })

test.beforeEach(async ({ typesPage: page }) => {
  await page.goto()

  await expect(page.getSpinner()).toBeHidden()
  await expect(page.getSkeleton()).toBeHidden()

  await page.checkPageHeaderTitle(['Types'])
})

test('should be able to create enum', async ({ typesPage: page }) => {
  await expect(page.getByExactText(enumTypeName)).toBeHidden()

  await page.createEnumType()

  await expect(page.getNotification()).toHaveText('Type created successfully')
  await expect(page.getByExactText(enumTypeName)).toBeVisible()
})

test('should be able to create array', async ({ typesPage: page }) => {
  await expect(page.getByExactText(arrayTypeName)).toBeHidden()

  await page.createArrayType()

  await expect(page.getNotification()).toHaveText('Type created successfully')
  await expect(page.getByExactText(arrayTypeName)).toBeVisible()
})

test('should be able to create interface', async ({ typesPage: page }) => {
  await expect(page.getByExactText(interfaceTypeName)).toBeHidden()

  await page.createInterfaceType()

  await expect(page.getNotification()).toHaveText('Type created successfully')
  await expect(page.getByExactText(interfaceTypeName)).toBeVisible()
})

test('should be able to add fields', async ({ typesPage: page }) => {
  await page.createInterfaceField()

  await expect(page.getNotification()).toHaveText('Field created successfully')
  await expect(page.getByExactText(interfaceTypeName)).toBeVisible()
})

test('should be able to update enum', async ({ typesPage: page }) => {
  await page.updateEnumType()

  await expect(page.getNotification()).toHaveText('Type updated successfully')
  await expect(page.getByExactText(enumTypeName)).toBeHidden()
  await expect(page.getByExactText(updatedEnumTypeName)).toBeVisible()
})

// skip until https://github.com/codelab-app/platform/issues/3533 is resolved
test.skip('should be able to update array', async ({ typesPage: page }) => {
  await page.updateArrayType()

  await expect(page.getNotification()).toHaveText('Type updated successfully')
  await expect(page.getByExactText(arrayTypeName)).toBeHidden()
  await expect(page.getByExactText(updatedArrayTypeName)).toBeVisible()
})

test('should be able to update interface', async ({ typesPage: page }) => {
  await page.updateInterfaceType()

  await expect(page.getNotification()).toHaveText('Type updated successfully')
  await expect(page.getByExactText(interfaceTypeName)).toBeHidden()
  await expect(page.getByExactText(updatedInterfaceTypeName)).toBeVisible()
})

test('should be able to update field', async ({ typesPage: page }) => {
  await page.updateInterfaceField()

  await expect(page.getNotification()).toHaveText('Field updated successfully')
  await expect(page.getByExactText(interfaceFieldName)).toBeHidden()
  await expect(page.getByExactText(updatedInterfaceFieldName)).toBeVisible()
})

test('should be able to delete enum type', async ({ typesPage: page }) => {
  await expect(page.getByExactText(updatedEnumTypeName)).toBeVisible()

  await page.deleteType(updatedEnumTypeName)

  await expect(page.getNotification()).toHaveText('Type deleted successfully')
  await expect(page.getByExactText(updatedEnumTypeName)).toBeHidden()
})

test('should be able to delete array type', async ({ typesPage: page }) => {
  await expect(page.getByExactText(arrayTypeName)).toBeVisible()

  await page.deleteType(arrayTypeName)

  await expect(page.getNotification()).toHaveText('Type deleted successfully')
  await expect(page.getByExactText(arrayTypeName)).toBeHidden()
})

test('should be able to delete interface field type', async ({
  typesPage: page,
}) => {
  await page.deleteFieldType(updatedInterfaceFieldName)

  await expect(page.getNotification()).toHaveText('Field deleted successfully')
  await expect(page.getByExactText(updatedInterfaceFieldName)).toBeHidden()
})

test('should be able to delete interface type', async ({ typesPage: page }) => {
  await expect(page.getByExactText(updatedInterfaceTypeName)).toBeVisible()

  await page.deleteType(updatedInterfaceTypeName)

  await expect(page.getNotification()).toHaveText('Type deleted successfully')
  await expect(page.getByExactText(updatedInterfaceTypeName)).toBeHidden()
})
