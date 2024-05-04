/* eslint-disable @typescript-eslint/member-ordering */
import * as env from 'env-var'
import type { IEndpointEnvVars } from './endpoint'

export interface IAuth0EnvVars {
  audience: string
  domain: string
  baseUrl: string
  clientId: string
  clientSecret: string
  cypressUsername: string
  cypressPassword: string
  issuerBaseUrl: string
  secret: string
}

/* *
 * https://github.com/auth0/nextjs-auth0/issues/383
 */
export class Auth0EnvVars implements IAuth0EnvVars {
  private _audience?: string

  private _auth0Domain?: string

  private _clientId?: string

  private _clientSecret?: string

  private _cypressUsername?: string

  private _cypressPassword?: string

  private _issuerBaseUrl?: string

  private _secret?: string

  constructor(private readonly endpoint: IEndpointEnvVars) {}

  get audience(): string {
    return (this._audience ??= new URL(
      'api/v2/',
      this.issuerBaseUrl,
    ).toString())
  }

  get domain(): string {
    return (this._auth0Domain ??= env.get('AUTH0_DOMAIN').required().asString())
  }

  get clientId(): string {
    return (this._clientId ??= env.get('AUTH0_CLIENT_ID').required().asString())
  }

  get clientSecret(): string {
    return (this._clientSecret ??= env
      .get('AUTH0_CLIENT_SECRET')
      .required()
      .asString())
  }

  get cypressUsername(): string {
    return (this._cypressUsername ??= env
      .get('AUTH0_CYPRESS_USERNAME')
      .required()
      .asString())
  }

  get cypressPassword(): string {
    return (this._cypressPassword ??= env
      .get('AUTH0_CYPRESS_PASSWORD')
      .required()
      .asString())
  }

  get issuerBaseUrl(): string {
    const issuerBaseUrl = new URL('/', `https://${this.domain}`).toString()

    return (this._issuerBaseUrl ??= issuerBaseUrl)
  }

  get secret(): string {
    return (this._secret ??= env.get('AUTH0_SECRET').required().asString())
  }

  get baseUrl() {
    const auth0baseUrl = this.endpoint.webHost

    return auth0baseUrl
  }
}
