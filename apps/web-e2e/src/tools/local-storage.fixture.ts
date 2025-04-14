import type { BrowserContext, Page } from '@playwright/test'

import { ensureFile } from 'fs-extra'
import { dirname } from 'path'

import { BasePage } from '../setup/core/page'
import { baseTest } from '../setup/fixtures/base.fixture'

export const localStorageTestFile =
  'apps/web-e2e/.storage/storage-state-test.json'

export class LocalStoragePage extends BasePage {
  context: BrowserContext

  constructor(page: Page, context: BrowserContext) {
    super(page, context)
    this.context = context
  }

  browser = () => {
    return this.context.browser()
  }

  getLocalStorageItem = async (key: string) => {
    return baseTest.step('getLocalStorageItem', async () => {
      return this.page.evaluate((itemKey) => localStorage.getItem(itemKey), key)
    })
  }

  setLocalStorageItem = async (key: string, value: string) => {
    return baseTest.step('setLocalStorageItem', async () => {
      await this.page.evaluate(
        ({ itemKey, itemValue }) => {
          localStorage.setItem(itemKey, itemValue)

          return true
        },
        { itemKey: key, itemValue: value },
      )
    })
  }

  setupLocalStorage = async (items: Record<string, string> = {}) => {
    return baseTest.step('setupLocalStorage', async () => {
      // Ensure storage file exists first
      await ensureFile(localStorageTestFile)

      // Navigate to the page first before accessing localStorage
      await this.page.goto('/')

      // Set localStorage items
      await this.page.evaluate((storageItems) => {
        Object.entries(storageItems).forEach(([key, value]) => {
          localStorage.setItem(key, value)
        })

        return true
      }, items)

      // Save the storage state to the file
      await this.context.storageState({ path: localStorageTestFile })
    })
  }
}

export const test = baseTest.extend<
  {
    localStoragePage: LocalStoragePage
  },
  {
    storageFilePath: string
  }
>({
  localStoragePage: async ({ context }, use) => {
    const page = await context.newPage()
    const localStoragePage = new LocalStoragePage(page, context)

    await use(localStoragePage)
  },

  // Add configurable storage file path with default value
  storageFilePath: [
    async ({ browser }, use, workerInfo) => {
      await use(localStorageTestFile)
    },
    { scope: 'worker' },
  ],
})
