import test from '@playwright/test'

export const globalBeforeAll = () =>
  test.beforeAll('Re-initialize database', async ({ request }) => {
    await request.post('/api/v1/admin/setup-e2e-data')
  })
