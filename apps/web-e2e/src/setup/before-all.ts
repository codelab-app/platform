import test from '@playwright/test'

import { requestOrThrow } from '../api'

export const globalBeforeAll = () =>
  test.beforeAll('Re-initialize database', async ({ request }) => {
    await requestOrThrow(request, '/api/v1/admin/setup-e2e-data')
  })
