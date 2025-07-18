import { getEnv } from '@codelab/shared-config-env'
import { expect } from '@playwright/test'

import {
  LocalStoragePage,
  localStorageTestFile,
  test,
} from './local-storage.fixture'

// Setup initial test values before running tests
test.beforeEach(async ({ browser, localStoragePage }) => {
  // Setup localStorage directly on the page that will be used in the test
  await localStoragePage.setupLocalStorage({
    anotherKey: 'anotherValue',
    testKey: 'testValue',
  })
})

// Test 1: Verify local storage persists across navigations
test('local storage persists across navigations', async ({
  localStoragePage,
}) => {
  // Ensure we're on a page
  await localStoragePage.page.goto('/')

  // Verify the local storage items are present
  const testKeyValue = await localStoragePage.getLocalStorageItem('testKey')

  const anotherKeyValue = await localStoragePage.getLocalStorageItem(
    'anotherKey',
  )

  expect(testKeyValue).toBe('testValue')
  expect(anotherKeyValue).toBe('anotherValue')

  // Navigate to another page
  await localStoragePage.page.goto('/about')

  // Verify the local storage is still there
  const testKeyValueAfterNavigation =
    await localStoragePage.getLocalStorageItem('testKey')

  expect(testKeyValueAfterNavigation).toBe('testValue')
})

// Test 2: Verify storage state can be used in a new browser context
test('storage state can be used in different contexts', async ({
  browser,
  localStoragePage,
}) => {
  // Ensure we're on a page
  await localStoragePage.page.goto('/')

  // Verify the local storage is loaded from storage state
  const testKeyValue = await localStoragePage.getLocalStorageItem('testKey')

  expect(testKeyValue).toBe('testValue')

  // Modify the local storage
  await localStoragePage.setLocalStorageItem('newKey', 'newValue')

  // Save the updated storage state
  await localStoragePage.context.storageState({ path: localStorageTestFile })

  // Create another context with the updated storage state
  const newContext = await browser.newContext({
    storageState: localStorageTestFile,
  })

  const newPage = await newContext.newPage()
  const newLocalStoragePage = new LocalStoragePage(newPage, newContext)

  await newPage.goto('/')

  // Verify all keys are present
  const oldKeyValue = await newLocalStoragePage.getLocalStorageItem('testKey')
  const newKeyValue = await newLocalStoragePage.getLocalStorageItem('newKey')

  expect(oldKeyValue).toBe('testValue')
  expect(newKeyValue).toBe('newValue')

  await newContext.close()
})

// Test 3: Load storage from custom JSON fixture file
test('can load storage from custom JSON fixture file', async ({ browser }) => {
  // Get the web host from environment service
  const webHost = getEnv().endpoint.webHost

  // Create dynamic custom storage file with proper origin
  const customStorageContent = {
    cookies: [],
    origins: [
      {
        localStorage: [
          { name: 'customKey1', value: 'customValue1' },
          { name: 'customKey2', value: 'customValue2' },
          { name: 'configKey', value: 'configValue' },
        ],
        origin: webHost,
      },
    ],
  }

  // Can use either file path or data
  const customContext = await browser.newContext({
    storageState: customStorageContent,
  })

  const customPage = await customContext.newPage()
  const customStoragePage = new LocalStoragePage(customPage, customContext)

  // Navigate to the page
  await customPage.goto('/')

  // Verify custom storage values are loaded correctly
  const customKey1Value = await customStoragePage.getLocalStorageItem(
    'customKey1',
  )

  const customKey2Value = await customStoragePage.getLocalStorageItem(
    'customKey2',
  )

  const configKeyValue = await customStoragePage.getLocalStorageItem(
    'configKey',
  )

  expect(customKey1Value).toBe('customValue1')
  expect(customKey2Value).toBe('customValue2')
  expect(configKeyValue).toBe('configValue')

  // Modify one of the values
  await customStoragePage.setLocalStorageItem('customKey1', 'updatedValue')

  // Verify the change was made
  const updatedValue = await customStoragePage.getLocalStorageItem('customKey1')

  expect(updatedValue).toBe('updatedValue')

  await customContext.close()
})
