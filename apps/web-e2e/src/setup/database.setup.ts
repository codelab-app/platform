import { expect, test } from '@playwright/test'

test('create new database', async ({ context, page, request }) => {
  try {
    // No need to manually set cookies - Playwright handles this automatically
    const response = await request.post('./admin/setup-e2e-data')

    console.log('Response status:', response.status())
    console.log('Response headers:', response.headers())

    const responseBody = await response.text()

    console.log('Response body:', responseBody)

    expect(response.status()).toEqual(201)
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
})
