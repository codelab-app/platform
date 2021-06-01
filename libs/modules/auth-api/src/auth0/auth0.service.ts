import { CACHE_MANAGER, CacheStore, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthenticationClient, ManagementClient } from 'auth0'
import { Auth0Configuration } from '../config/auth.config'
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
  private _config: Auth0Configuration

  constructor(
    configService: ConfigService,
    @Inject(CACHE_MANAGER) protected readonly cacheManager: CacheStore,
  ) {
    const config = configService.get<Auth0Configuration>(
      AuthTokens.Auth0Config.toString(),
    )

    if (!config) {
      throw new Error('Auth0 config not provided')
    }

    this._config = config
  }

  private getDomain() {
    return new URL(this._config.issuer).hostname
  }

  async getAccessToken() {
    const cachedAccessToken = await this.cacheManager.get<string>('accessToken')

    if (cachedAccessToken) {
      return cachedAccessToken
    }

    const { access_token } = await this.getAuthClient().clientCredentialsGrant({
      audience: this._config.api.audience,
    })

    // Set to 1 month, corresponds to Auth0 dashboard value
    this.cacheManager.set('accessToken', access_token, { ttl: 2592000 })

    return access_token
  }

  getAuthClient() {
    return new AuthenticationClient({
      domain: this.getDomain(),
      clientId: this._config.api.clientId,
      clientSecret: this._config.api.clientSecret,
    })
  }

  getManagementClient() {
    return new ManagementClient({
      domain: this.getDomain(),
      clientId: this._config.api.clientId,
      clientSecret: this._config.api.clientSecret,
    })
  }
}
