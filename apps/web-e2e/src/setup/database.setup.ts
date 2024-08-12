import { graphqlClient } from '@codelab/backend/infra/adapter/graphql'
import { assertIsDefined } from '@codelab/shared/utils'
import { expect, test } from '@playwright/test'

test('create new database', async ({ context, page, request, ...rest }) => {
  console.log('creating new database...', process.env.AUTHORIZATION_TOKEN)

  // const cookies = await context.cookies()
  // const appSession = cookies.find((cookie) => cookie.name === 'appSession')

  // assertIsDefined(appSession)

  try {
    const response = await request.post(
      'http://127.0.0.1:3001/api/v1/admin/setup-e2e-data',
      {
        // No need to manually set cookies - Playwright handles this automatically
      },
    )

    // const response = await fetch(
    //   'http://127.0.0.1:3001/api/v1/admin/setup-e2e-data',
    //   {
    //     headers: {
    //       Cookie: `appSession=${appSession.value}`,
    //     },
    //     method: 'POST',
    //   },
    // )

    console.log('Response status:', response.status())
    console.log('Response headers:', response.headers())

    const responseBody = await response.text()

    console.log('Response body:', responseBody)

    expect(response.status()).toEqual(200)
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
})
