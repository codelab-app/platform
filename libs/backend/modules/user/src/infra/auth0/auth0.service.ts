import { Inject, Injectable } from '@nestjs/common'
import {
  AuthenticationClient,
  ManagementClient,
  ManagementClientOptions,
} from 'auth0'
import type { Auth0Config } from './config/auth0.config'
import { auth0Config } from './config/auth0.config'

@Injectable()
export class Auth0Service {
  constructor(
    @Inject(auth0Config.KEY) private readonly _auth0Config: Auth0Config,
  ) {}

  private get issuer() {
    return new URL(this._auth0Config.issuer).hostname
  }

  /**
   * Instead of M2M, we use client password grant.
   */
  getAuthClient() {
    return new AuthenticationClient({
      clientId: this._auth0Config.clientId,
      clientSecret: this._auth0Config.clientSecret,
      domain: this.issuer,
    })
  }

  /**
   * Requires M2M api. We create wrapper around the management client to be used internally.
   */
  private _getManagementClient(options?: Partial<ManagementClientOptions>) {
    return new ManagementClient({
      domain: this.issuer,
      scope: 'update:users',
      clientId: this._auth0Config.api.clientId,
      clientSecret: this._auth0Config.api.clientSecret,
      ...options,
    })
  }

  /**
   * A client ready to be used by the outside, has token added.
   */
  async getManagementClient(options?: Partial<ManagementClientOptions>) {
    const token = await this._getManagementClient().getAccessToken()

    return this._getManagementClient({ token, ...options })
  }
}
