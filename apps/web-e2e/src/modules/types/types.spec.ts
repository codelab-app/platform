import { RoutePaths } from '@codelab/frontend/abstract/application'
import { expect } from '@playwright/test'

import { globalBeforeAll } from '../../setup/before-all'
import {
  arrayTypeName,
  enumTypeName,
  interfaceFieldName,
  interfaceTypeName,
  unionTypeName,
  updatedArrayTypeName,
  updatedEnumTypeName,
  updatedInterfaceFieldName,
  updatedInterfaceTypeName,
  updatedUnionTypeName,
} from './types.data'
import { test } from './types.fixture'

test.describe.configure({ mode: 'serial' })

globalBeforeAll()

test.beforeEach(async ({ typesPage: page }) => {
  await page.goto()

  await expect(page.getSpinner()).toBeHidden()
  await expect(page.getSkeleton()).toBeHidden()

  await page.checkPageHeaderTitle(['Types'])
})

test('should be able to create enum', async ({ typesPage: page }) => {
  await expect(page.getByExactText(enumTypeName)).toBeHidden()

  await page.createEnumType()
  await page.expectNotificationSuccess('Type created successfully')
  await page.waitForPage(RoutePaths.Type.base())

  await expect(page.getByExactText(enumTypeName)).toBeVisible()
})

test('should be able to create array', async ({ typesPage: page }) => {
  await expect(page.getByExactText(arrayTypeName)).toBeHidden()

  await page.createArrayType()
  await page.expectNotificationSuccess('Type created successfully')
  await page.waitForPage(RoutePaths.Type.base())

  await expect(page.getByExactText(arrayTypeName)).toBeVisible()
})

test('should be able to create interface', async ({ typesPage: page }) => {
  await expect(page.getByExactText(interfaceTypeName)).toBeHidden()

  await page.createInterfaceType()
  await page.expectNotificationSuccess('Type created successfully')
  await page.waitForPage(RoutePaths.Type.base())

  await expect(page.getByExactText(interfaceTypeName)).toBeVisible()
})

test('should be able to create union', async ({ typesPage: page }) => {
  await expect(page.getByExactText(unionTypeName)).toBeHidden()

  await page.createUnionType()
  await page.expectNotificationSuccess('Type created successfully')
  await page.waitForPage(RoutePaths.Type.base())

  await expect(page.getByExactText(unionTypeName)).toBeVisible()
})

test('should be able to add fields', async ({ typesPage: page }) => {
  await page.createInterfaceField()

  await page.expectNotificationSuccess('Field created successfully')
  await page.waitForPage(RoutePaths.Type.base())

  await expect(page.getByExactText(interfaceTypeName)).toBeVisible()
})

test('should be able to update enum', async ({ typesPage: page }) => {
  await page.updateEnumType()

  await page.expectNotificationSuccess('Type updated successfully')
  await page.waitForPage(RoutePaths.Type.base())

  await expect(page.getByExactText(enumTypeName)).toBeHidden()
  await expect(page.getByExactText(updatedEnumTypeName)).toBeVisible()
})

test('should be able to update array', async ({ typesPage: page }) => {
  await page.updateArrayType()

  await page.expectNotificationSuccess('Type updated successfully')
  await page.waitForPage(RoutePaths.Type.base())

  await expect(page.getByExactText(arrayTypeName)).toBeHidden()
  await expect(page.getByExactText(updatedArrayTypeName)).toBeVisible()
})

test('should be able to update interface', async ({ typesPage: page }) => {
  await page.updateInterfaceType()

  await page.expectNotificationSuccess('Type updated successfully')
  await page.waitForPage(RoutePaths.Type.base())

  await expect(page.getByExactText(interfaceTypeName)).toBeHidden()
  await expect(page.getByExactText(updatedInterfaceTypeName)).toBeVisible()
})

test('should be able to update field', async ({ typesPage: page }) => {
  await page.updateInterfaceField()

  await page.expectNotificationSuccess('Field updated successfully')
  await page.waitForPage(RoutePaths.Type.base())

  await expect(page.getByExactText(interfaceFieldName)).toBeHidden()
  await expect(page.getByExactText(updatedInterfaceFieldName)).toBeVisible()
})

test('should be able to update union', async ({ typesPage: page }) => {
  await page.updateUnionType()

  await page.expectNotificationSuccess('Type updated successfully')
  await page.waitForPage(RoutePaths.Type.base())

  await expect(page.getByExactText(unionTypeName)).toBeHidden()
  await expect(page.getByExactText(updatedUnionTypeName)).toBeVisible()
})

test('should be able to delete enum type', async ({ typesPage: page }) => {
  await expect(page.getByExactText(updatedEnumTypeName)).toBeVisible()

  await page.deleteType(updatedEnumTypeName)

  await page.expectNotificationSuccess('Type deleted successfully')
  await page.waitForPage(RoutePaths.Type.base())

  await expect(page.getByExactText(updatedEnumTypeName)).toBeHidden()
})

test('should be able to delete array type', async ({ typesPage: page }) => {
  await expect(page.getByExactText(updatedArrayTypeName)).toBeVisible()

  await page.deleteType(updatedArrayTypeName)

  await page.expectNotificationSuccess('Type deleted successfully')
  await page.waitForPage(RoutePaths.Type.base())

  await expect(page.getByExactText(updatedArrayTypeName)).toBeHidden()
})

test('should be able to delete interface field type', async ({
  typesPage: page,
}) => {
  await page.deleteFieldType(updatedInterfaceFieldName)

  await page.expectNotificationSuccess('Field deleted successfully')
  await page.waitForPage(RoutePaths.Type.base())

  await expect(page.getByExactText(updatedInterfaceFieldName)).toBeHidden()
})

test('should be able to delete interface type', async ({ typesPage: page }) => {
  await expect(page.getByExactText(updatedInterfaceTypeName)).toBeVisible()

  await page.deleteType(updatedInterfaceTypeName)

  await page.expectNotificationSuccess('Type deleted successfully')
  await page.waitForPage(RoutePaths.Type.base())

  await expect(page.getByExactText(updatedInterfaceTypeName)).toBeHidden()
})

test('should be able to delete union type', async ({ typesPage: page }) => {
  await expect(page.getByExactText(updatedUnionTypeName)).toBeVisible()

  await page.deleteType(updatedUnionTypeName)

  await page.expectNotificationSuccess('Type deleted successfully')
  await page.waitForPage(RoutePaths.Type.base())

  await expect(page.getByExactText(updatedUnionTypeName)).toBeHidden()
})
