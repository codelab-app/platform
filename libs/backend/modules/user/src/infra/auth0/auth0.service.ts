import { Inject, Injectable } from '@nestjs/common'
import { AuthenticationClient, ManagementClient } from 'auth0'
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

  getManagementClient() {
    return new ManagementClient({
      domain: this.issuer,
      clientId: this._auth0Config.clientId,
      clientSecret: this._auth0Config.clientSecret,
    })
  }
}
