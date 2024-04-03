/* eslint-disable @typescript-eslint/member-ordering */
import * as env from 'env-var'
import type { IEndpointEnvVars } from './endpoint'

export interface IAuth0EnvVars {
  audience: string
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
 *
 * `isVercel` is runtime
 * `isVercelPreview` is build-time
 */
export class Auth0EnvVars implements IAuth0EnvVars {
  private _audience?: string

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
    const auth0Domain = env.get('AUTH0_DOMAIN').required().asString()
    const issuerBaseUrl = new URL('/', `https://${auth0Domain}`).toString()

    return (this._issuerBaseUrl ??= issuerBaseUrl)
  }

  get secret(): string {
    return (this._secret ??= env.get('AUTH0_SECRET').required().asString())
  }

  get baseUrl() {
    const auth0baseUrl = this.endpoint.platformHost

    return auth0baseUrl
  }
}
