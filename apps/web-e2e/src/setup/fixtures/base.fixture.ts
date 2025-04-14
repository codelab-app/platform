import type { BrowserContext } from '@playwright/test'

import { test as base } from '@playwright/test'
import { ensureFile, existsSync } from 'fs-extra'

import { storageStateFile } from '../../../playwright.config'

/**
 * You cannot directly apply storageState to an existing Page. Instead, you apply the storage state at the BrowserContext level and then create a new Page in that context
 */
export const baseTest = base.extend<{
  storageFilePath: string
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  forEachTest: void
}>({
  forEachTest: [
    async ({ context, page }, use) => {
      // This code runs before every test.
      await use()
      // This code runs after every test.

      // Store the storage state after each step, so the next step can use it
      await context.storageState({ path: storageStateFile })
    },
    // The `auto` here is what triggers it, not the method name
    { auto: true },
  ],
  page: async ({ context }, use) => {
    // Create a new page from the browser context, instead of using the default one
    const page = await context.newPage()

    // Attach the console event to the page
    page.on('console', async (msg) => {
      const values = []

      for (const arg of msg.args()) {
        values.push(await arg.jsonValue())
      }

      console.log(`[Browser ${msg.type()}]`, ...values)
    })

    // Make sure to pass control back for tests
    await use(page)
  },
  // Add configurable storage file path with default value
  storageFilePath: [storageStateFile, { option: true }],
})
