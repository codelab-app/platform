import type { IAppDto } from '@codelab/shared/abstract/core'

import { PageType, PrimarySidebar } from '@codelab/frontend/abstract/types'
import test, { expect } from '@playwright/test'
import { merge } from 'remeda'

import { getCuiTree, getTimestamp } from '../../commands'
import { globalBeforeAll } from '../../setup/before-all'
import { seedAppData, seedPageData } from '../builder/builder.data'
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
