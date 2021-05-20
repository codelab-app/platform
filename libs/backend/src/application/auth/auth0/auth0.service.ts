import { AuthTokens } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthenticationClient, ManagementClient } from 'auth0'
import { Auth0Configuration } from '../config/auth.config'

@Injectable()
export class Auth0Service {
  private _config: Auth0Configuration

  constructor(configService: ConfigService) {
    const config = configService.get<Auth0Configuration>(AuthTokens.Auth0Config)

    if (!config) {
      throw new Error('Auth0 config not provided')
    }

    this._config = config
  }

  private getDomain() {
    return new URL(this._config.issuer).hostname
  }

  getAuthClient() {
    return new AuthenticationClient({
      domain: this.getDomain(),
      clientId: this._config.api.clientId,
    })
  }

  getManagementClient() {
    console.log(this._config.issuer)

    return new ManagementClient({
      domain: this.getDomain(),
      clientId: this._config.api.clientId,
      clientSecret: this._config.api.clientSecret,
    })
  }
}
