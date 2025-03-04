import { getEnv } from '@codelab/shared/config/env'
import test, { expect } from '@playwright/test'

import { getTimestamp, waitForJobCompletion } from '../../commands'
import { globalBeforeAll } from '../../setup/before-all'
import { demoRequest } from './demo.fixture'

test.describe.configure({ mode: 'serial' })

globalBeforeAll()

test.beforeAll(async ({ request }, testInfo) => {
  console.log(`[${getTimestamp()}] Demo start`)

  await demoRequest(request)

  console.log(`[${getTimestamp()}] Demo end`)
})

test('demo', () => {
  expect(true).toBe(true)
})
