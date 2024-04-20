import { AuthenticationClient } from 'auth0'

// export const managementClient = new ManagementClient({
//   clientId: m2mConfig.clientId,
//   clientSecret: m2mConfig.clientSecret,
//   // domain: config.audience.hostname,
//   domain: '',
// })

interface Auth0ClientConfig {
  auth0Audience: string
  // 'codelab-app.us.auth0.com'
  auth0Domain: string
  clientId: string
  clientSecret: string
}

export class Auth0Client {
  constructor({
    auth0Audience,
    auth0Domain,
    clientId,
    clientSecret,
  }: Auth0ClientConfig) {
    this.auth0Audience = auth0Audience

    this.client = new AuthenticationClient({
      clientId,
      clientSecret,
      domain: auth0Domain,
    })
  }

  async loginWithPassword(username: string, password: string) {
    return this.client.oauth.passwordGrant({
      audience: this.auth0Audience,
      password,
      // realm: 'Username-Password-Authentication',
      // Replace with the connection you want to use
      scope: 'openid profile email',
      username,
    })
  }

  private auth0Audience

  private client
}
