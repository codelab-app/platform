import test from '@playwright/test'

import { requestOrThrow } from '../api'

export const globalBeforeAll = () =>
  test.beforeAll('Re-initialize database', async ({ request }) => {
    await requestOrThrow(request, 'admin/setup-e2e-data', {
      method: 'POST',
    })
  })
