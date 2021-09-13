import { Controller, Get, Inject } from '@nestjs/common'
import { ClientParams, Data } from 'auth0'
import jwtDecode from 'jwt-decode'
import { JwtPayload } from '../auth/jwt.interface'
import { Auth0Service } from './auth0.service'
import { Auth0Config, auth0Config } from './config/auth0.config'

/**
 * Some useful endpoints for interacting with Auth0. Akin to infrastructure as code, so we don't have to manually manage using the dashboard.
 */
@Controller('auth0')
export class Auth0Controller {
  constructor(
    private auth0Service: Auth0Service,
    @Inject(auth0Config.KEY) readonly _auth0Config: Auth0Config,
  ) {}

  /**
   * Using password grant allows us to log in as a specific user which gives us role information. Using M2M we can't simulate as a user.
   *
   * Not only that, using password grant means Auth0 actions will be called, so we can attach claim info to the returned JWT.
   */
  @Get('login')
  async login() {
    const { access_token } = await this.auth0Service
      .getAuthClient()
      .passwordGrant({
        username: 'admin@codelab.ai',
        password: 'a!LcxKZB6W@f',
        audience: this._auth0Config.audience,
        // realm: 'Username-Password-Authentication',
        scope: 'openid email profile',
      })

    /**
     * This token has claims on them added by Auth actions, we just need to decode them
     */
    const decoded = jwtDecode<JwtPayload>(access_token)
  }

  @Get('grants')
  async patchGrantTypes() {
    const params: ClientParams = {
      client_id: this._auth0Config.clientId,
    }

    const client = await this.auth0Service
      .getManagementClient()
      .getClient(params)

    const data: Data = {
      grant_types: [
        'password',
        'http://auth0.com/oauth/grant-type/password-realm',
      ],
    }
    // await this.auth0Service.getManagementClient().updateClient(params, data)
  }
}
