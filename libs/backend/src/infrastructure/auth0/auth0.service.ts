import { Inject, Injectable } from '@nestjs/common'
import { AuthenticationClient, ManagementClient } from 'auth0'
import { Auth0Config } from './config/auth0.config'
import { Auth0Tokens } from './config/auth0.tokens'

/**
 * Auth0 has 2 API's
 *
 * AuthenticationClient deals with authorizing clients
 *
 * Management API deals with things you would do inside the Auth0 dashboard.
 */
@Injectable()
export class Auth0Service {
  constructor(
    @Inject(Auth0Tokens.Auth0Config) private readonly auth0Config: Auth0Config,
  ) {}

  private getDomain() {
    return new URL(this.auth0Config.issuer).hostname
  }

  /**
   * Wouldn't be easy to persist tokens across different app initializations using built in Nest.js caching modules, so we extract to `.env` file.
   *
   * The token expiration is 30 days, so we'll manually update `.env` file for now.
   */
  async getAccessToken() {
    // Check if current access token is working
    const results = await this.getAuthClient().oauth?.signIn({
      username: this.auth0Config.cypressUsername,
      password: this.auth0Config.cypressPassword,
    })

    console.log(results)

    const { access_token } = await this.getAuthClient().clientCredentialsGrant({
      audience: this.auth0Config.api.audience,
    })

    return access_token
  }

  getAuthClient() {
    return new AuthenticationClient({
      domain: this.getDomain(),
      clientId: this.auth0Config.api.clientId,
      clientSecret: this.auth0Config.api.clientSecret,
    })
  }

  getManagementClient() {
    return new ManagementClient({
      domain: this.getDomain(),
      clientId: this.auth0Config.api.clientId,
      clientSecret: this.auth0Config.api.clientSecret,
    })
  }
}
