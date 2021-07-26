import { Inject, Injectable } from '@nestjs/common'
import { AuthenticationClient, ManagementClient } from 'auth0'
import axios from 'axios'
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
   * We pick any api on random in order to test our access token.
   */
  private get managementApiUrl() {
    return new URL('api/v2/clients', this.auth0Config.issuer).toString()
  }

  /**
   * https://community.auth0.com/t/bad-audience-when-using-a-custom-api/9700/11
   *
   */
  async getAccessToken() {
    /**
     * Check if current access token is working, unauthorized will go to catch block
     */
    try {
      await axios.get(this.managementApiUrl, {
        headers: {
          Authorization: `Bearer ${this.auth0Config.api.accessToken}`,
        },
      })
    } catch (e) {
      const { access_token } =
        await this.getAuthClient().clientCredentialsGrant({
          audience: this.auth0Config.api.audience,
        })

      console.log('Please update `AUTH0_M2M_TOKEN` with', access_token)

      return process.exit(1)
    }

    return this.auth0Config.api.accessToken
  }

  getAuthClient() {
    return new AuthenticationClient({
      clientId: this.auth0Config.api.clientId,
      clientSecret: this.auth0Config.api.clientSecret,
      domain: this.getDomain(),
    })
  }

  getManagementClient(token?: string) {
    return new ManagementClient({
      // token,
      domain: this.getDomain(),
      clientId: this.auth0Config.api.clientId,
      clientSecret: this.auth0Config.api.clientSecret,
    })
  }
}
