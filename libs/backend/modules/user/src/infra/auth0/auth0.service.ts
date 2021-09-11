import { Inject, Injectable } from '@nestjs/common'
import { AuthenticationClient, ManagementClient } from 'auth0'
import type { Auth0Config } from './config/auth0.config'
import { auth0Config } from './config/auth0.config'

@Injectable()
export class Auth0Service {
  // onApplicationShutdown(signal: ShutdownSignal) {
  //   if (signal === ShutdownSignal.SIGTERM) {
  //     console.log('Please update `AUTH0_M2M_TOKEN` with', this.newAccessToken)
  //   }
  // }

  constructor(
    @Inject(auth0Config.KEY) private readonly _auth0Config: Auth0Config,
  ) {}

  private get issuer() {
    return new URL(this._auth0Config.issuer).hostname
  }

  /**
   * https://community.auth0.com/t/bad-audience-when-using-a-custom-api/9700/11
   *
   */
  // async getAccessToken() {
  //   /**
  //    * Check if current access token is working, unauthorized will go to catch block
  //    */
  //   try {
  //     const { access_token } = await this.getAuthClient().passwordGrant({
  //       username: this._auth0Config.admin.username,
  //       password: this._auth0Config.admin.password,
  //       audience: this._auth0Config.audience,
  //       // realm: 'Username-Password-Authentication',
  //       scope: 'openid email profile',
  //     })
  //   } catch (e) {
  //     const { access_token } =
  //       await this.getAuthClient().clientCredentialsGrant({
  //         audience: this._auth0Config.audience,
  //       })
  //
  //     kill(process.pid, ShutdownSignal.SIGTERM)
  //   }
  //
  //   return this._auth0Config.cypress.accessToken
  // }

  /**
   * Instead of M2M, we use client password grant.
   */
  getAuthClient() {
    return new AuthenticationClient({
      // clientId: this._auth0Config.api.clientId,
      // clientSecret: this._auth0Config.api.clientSecret,
      clientId: this._auth0Config.clientId,
      clientSecret: this._auth0Config.clientSecret,
      domain: this.issuer,
    })
  }

  getManagementClient(token?: string) {
    return new ManagementClient({
      // token,
      domain: this.issuer,
      clientId: this._auth0Config.clientId,
      clientSecret: this._auth0Config.clientSecret,
    })
  }
}
