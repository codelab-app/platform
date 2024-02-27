import { getEnv } from '@codelab/shared/config'
import { Auth0Client } from './client'

describe('Auth0 client', () => {
  /**
   * Don't run this during specs, use for developing and testing the API only
   */
  it('can login programmatically', async () => {
    const env = getEnv()

    const auth0Client = new Auth0Client({
      clientId: env.auth0.clientId,
      clientSecret: env.auth0.clientSecret,
      issuerBaseUrl: env.auth0.issuerBaseUrl,
    })

    const response = await auth0Client.loginWithPassword(
      env.auth0.cypressUsername,
      env.auth0.cypressPassword,
    )

    console.log(response.data.access_token)
  })
})
