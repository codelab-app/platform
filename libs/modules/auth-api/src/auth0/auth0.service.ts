import { CACHE_MANAGER, CacheStore, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthenticationClient, ManagementClient } from 'auth0'
import { Auth0Config } from '../config/auth.config'
import { AuthTokens } from '../config/auth.tokens'

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
    @Inject(AuthTokens.Auth0Config) private readonly auth0Config: Auth0Config,
    @Inject(CACHE_MANAGER) protected readonly cacheManager: CacheStore,
  ) {}

  private getDomain() {
    return new URL(this.auth0Config.issuer).hostname
  }

  async getAccessToken() {
    const cachedAccessToken = await this.cacheManager.get<string>('accessToken')

    if (cachedAccessToken) {
      return cachedAccessToken
    }

    const { access_token } = await this.getAuthClient().clientCredentialsGrant({
      audience: this.auth0Config.api.audience,
    })

    // Set to 1 month, corresponds to Auth0 dashboard value
    this.cacheManager.set('accessToken', access_token, { ttl: 2592000 })

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
