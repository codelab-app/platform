import type { UnknownObjectLike } from '@codelab/shared-abstract-types'

import { getEnv } from '@codelab/shared-config-env'
import { test as base } from '@playwright/test'
import { ensureFile, readFile, writeFile } from 'fs-extra'

import { storageStateFile } from '../config'

// Default storage state with empty localStorage
const defaultStorageState = {
  cookies: [],
  origins: [
    {
      localStorage: [],
      origin: getEnv().endpoint.webHost,
    },
  ],
}

/**
 * Ensures a file exists and only writes default content if it doesn't exist already
 */
const ensureWithDefaults = async (
  filePath: string,
  defaultContent: UnknownObjectLike,
) => {
  await ensureFile(filePath)

  try {
    // Check if file exists and has content
    const stats = await readFile(filePath, 'utf8')

    if (!stats || stats.trim() === '') {
      // File is empty, write default content
      await writeFile(filePath, JSON.stringify(defaultContent, null, 2))
    }
  } catch (error) {
    // File doesn't exist or error reading, write default content
    await writeFile(filePath, JSON.stringify(defaultContent, null, 2))
  }
}

/**
 * You cannot directly apply storageState to an existing Page. Instead, you apply the storage state at the BrowserContext level and then create a new Page in that context
 */
export const baseTest = base.extend<
  {
    forEachTest: void
  },
  {
    // forEachWorker: void
  }
>({
  /**
   * Playwright automatically closes the browser context after each test, but we need to persist storage across tests since playwright treats each test as separate storage
   */
  forEachTest: [
    async ({ context, page }, use) => {
      // This code runs before every test.
      await use()
      // This code runs after every test.

      // Store the storage state after each step, so the next step can use it
      await context.storageState({ path: storageStateFile })

      // Close the browser context after each test
      await context.close()
    },
    // The `auto` here is what triggers it, not the method name
    { auto: true },
  ],
  // forEachWorker: [
  //   async ({ browser }, use) => {
  //     // This code runs for each worker
  //     await use()
  //     // This code runs after worker completes
  //   },
  //   { auto: true, scope: 'worker' },
  // ],
  page: async ({ context }, use) => {
    // Create a new page from the browser context, instead of using the default one
    const page = await context.newPage()

    // Attach the console event to the page
    // Attach the console event to the page
    page.on('console', (msg) => {
      console.log(`[Browser] ${msg.text()}`)
    })

    // Make sure to pass control back for tests
    await use(page)
  },
  storageState: [
    async ({ browser }, use) => {
      // Ensure file exists and write default content if it doesn't exist already
      // await ensureWithDefaults(storageStateFile, defaultStorageState)

      await use(storageStateFile)
    },
    { scope: 'test' },
  ],
})
