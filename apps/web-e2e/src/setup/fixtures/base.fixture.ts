import { test as base, expect, request } from '@playwright/test'

export const baseTest = base.extend({
  // Override the default page fixture
  page: async ({ page }, use) => {
    // Attach the console event to the page
    page.on('console', (msg) => {
      console.log(msg.text())
    })

    // Make sure to pass control back for tests
    await use(page)
  },
})
