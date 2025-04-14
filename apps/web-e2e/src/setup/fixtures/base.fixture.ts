/* eslint-disable @typescript-eslint/no-invalid-void-type */
import type { BrowserContext } from '@playwright/test'

import { getEnv } from '@codelab/shared/config/env'
import { test as base } from '@playwright/test'
import { ensureFile, writeFile } from 'fs-extra'

import { storageStateFile } from '../../../playwright.config'

/**
 * You cannot directly apply storageState to an existing Page. Instead, you apply the storage state at the BrowserContext level and then create a new Page in that context
 */
export const baseTest = base.extend<
  {
    forEachTest: void
    context: BrowserContext
  },
  {
    storageFilePath: string
    forEachWorker: void
  }
>({
  /**
   * Custom context that enables dynamic storage state control during tests.
   * Supplements config-level storageState by allowing state persistence between
   * tests and supporting different storage files for different test suites.
   */
  context: async ({ browser, storageFilePath }, use) => {
    // Create a browser context with storage state
    const context = await browser.newContext({
      storageState: storageFilePath,
    })

    await use(context)
  },
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
  forEachWorker: [
    async ({ storageFilePath }, use) => {
      // This code runs before all the tests in the worker/test file
      console.log(
        `Resetting storage state for worker ${base.info().workerIndex}`,
      )

      // Create directory if it doesn't exist
      await ensureFile(storageFilePath)

      // Create an empty storage state template
      const emptyStorageState = {
        cookies: [],
        origins: [
          {
            localStorage: [],
            origin: getEnv().endpoint.webHost,
          },
        ],
      }

      // Write the empty state to the file
      await writeFile(
        storageFilePath,
        JSON.stringify(emptyStorageState, null, 2),
      )

      // Execute tests
      await use()

      // This runs after all tests in the worker
    },
    { auto: true, scope: 'worker' },
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
  storageFilePath: [storageStateFile, { option: true, scope: 'worker' }],
})
