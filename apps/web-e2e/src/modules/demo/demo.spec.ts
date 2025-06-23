import { getTimestamp } from '@codelab/shared-infra-logging'
import { expect } from '@playwright/test'

import { globalBeforeAll } from '../../setup/before-all'
import { demoRequest, test } from './demo.fixture'

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
