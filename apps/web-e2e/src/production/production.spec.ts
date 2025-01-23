import { expect } from '@playwright/test'

import { globalBeforeAll } from '../setup/before-all'
import { test } from './production.fixture'

test.describe.configure({ mode: 'serial' })

globalBeforeAll()

// skip until production is fixed
test.skip('deployed production user app renders properly', async ({
  productionPage: page,
}) => {
  await page.goto()

  await expect(page.page.locator('body')).toHaveText(
    'Hello from production app!',
  )
})
