import { graphqlClient } from '@codelab/backend/infra/adapter/graphql'
import { expect, test } from '@playwright/test'

test('create new database', async ({ page }) => {
  console.log('creating new database...')

  try {
    const response = await fetch(
      'http://127.0.0.1:3001/api/v1/admin/setup-e2e-data',
      {
        method: 'POST',
      },
    )

    console.log('Response status:', response.status)
    console.log('Response headers:', response.headers)

    const responseBody = await response.text()

    console.log('Response body:', responseBody)

    expect(response.status).toEqual(200)
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
})
