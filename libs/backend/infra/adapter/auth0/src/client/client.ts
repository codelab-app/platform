import { AuthenticationClient, ManagementClient } from 'auth0'

// export const managementClient = new ManagementClient({
//   clientId: m2mConfig.clientId,
//   clientSecret: m2mConfig.clientSecret,
//   // domain: config.audience.hostname,
//   domain: '',
// })

interface Auth0ClientConfig {
  clientId: string
  clientSecret: string

  issuerBaseUrl: string
}

export class Auth0Client {
  constructor({ clientId, clientSecret, issuerBaseUrl }: Auth0ClientConfig) {
    this.client = new AuthenticationClient({
      clientId,
      clientSecret,
      // This will be 'codelab-app.us.auth0.com'
      domain: new URL(issuerBaseUrl).hostname,
      // domain: issuerBaseUrl,
    })
    this.issuerBaseUrl = issuerBaseUrl
  }

  async loginWithPassword(username: string, password: string) {
    return this.client.oauth.passwordGrant({
      audience: new URL('/api/v2/', this.issuerBaseUrl).toString(),
      password,
      // realm: 'Username-Password-Authentication',
      // Replace with the connection you want to use
      scope: 'openid profile email',
      username,
    })
  }

  private client

  private issuerBaseUrl
}
