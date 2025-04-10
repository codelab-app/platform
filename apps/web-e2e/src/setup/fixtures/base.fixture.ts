import type { BrowserContext } from '@playwright/test'

import { test as base } from '@playwright/test'
import { ensureFile, existsSync } from 'fs-extra'

import { storageStateFile } from '../../../playwright.config'

/**
 * You cannot directly apply storageState to an existing Page. Instead, you apply the storage state at the BrowserContext level and then create a new Page in that context
 */
export const baseTest = base.extend<{
  browserContext: BrowserContext
  storageFilePath: string
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  forEachTest: void
}>({
  browserContext: async ({ browser, storageFilePath }, use) => {
    /**
     * Create empty storage state
     */

    /**
     * Cursor: if `storageStateFile` does not exist, create a new context like below. but if it exists, use the existing one.
     */

    const context = await browser.newContext({
      storageState: storageFilePath,
    })

    await use(context)
    await context.close()
  },
  forEachTest: [
    async ({ browserContext, page }, use) => {
      // This code runs before every test.
      await use()
      // This code runs after every test.
      // console.log('after each')

      // Store the storage state after each step, so the next step can use it
      await browserContext.storageState({ path: storageStateFile })
    },
    // The `auto` here is what triggers it, not the method name
    { auto: true },
  ],
  // forEachWorker: [
  //   async (_: unknown, use: (value: unknown) => Promise<void>) => {
  //     // This code runs before all the tests in the worker process.
  //     console.log(`Starting test worker ${base.info().workerIndex}`)

  //     await ensureFile(storageStateFile)

  //     await use()
  //     // This code runs after all the tests in the worker process.
  //     console.log(`Stopping test worker ${base.info().workerIndex}`)
  //   },
  //   /**
  //    * The `auto` means it runs automatically without having to inject it and call it
  //    *
  //    * `worker` scope means it's called once per worker, without it it is called per test
  //    */
  //   { auto: true, scope: 'worker' },
  // ],
  page: async ({ browserContext }, use) => {
    // Create a new page from the browser context, instead of using the default one
    const page = await browserContext.newPage()

    // Attach the console event to the page
    page.on('console', (msg) => {
      console.log(`[Browser] ${msg.text()}`)
    })

    // Make sure to pass control back for tests
    await use(page)
    // await use(f)
  },
  // Add configurable storage file path with default value
  storageFilePath: [storageStateFile, { option: true }],
})
