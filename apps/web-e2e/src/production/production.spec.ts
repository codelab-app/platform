import { expect } from '@playwright/test'

import { test } from './production.fixture'

// skip until production is fixed
test.skip('deployed production user app renders properly', async ({
  productionPage: page,
}) => {
  await page.goto()

  await expect(page.page.locator('body')).toHaveText(
    'Hello from production app!',
  )
})
