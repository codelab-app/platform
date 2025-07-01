/* eslint-disable @typescript-eslint/member-ordering */
import type { IEndpointEnvVars } from './endpoint'

import { env } from '../env'

export interface IAuth0EnvVars {
  audience: string
  domain: string
  baseUrl: string
  clientId: string
  clientSecret: string
  auth0Username: string
  auth0Password: string
  issuerBaseUrl: string
  secret: string
  sessionAutoSave: boolean
  m2mClientId: string
  m2mClientSecret: string
}

/* *
 * https://github.com/auth0/nextjs-auth0/issues/383
 */
export class Auth0EnvVars implements IAuth0EnvVars {
  private _audience?: string

  private _auth0Domain?: string

  private _clientId?: string

  private _clientSecret?: string

  private _e2eUsername?: string

  private _e2ePassword?: string

  private _issuerBaseUrl?: string

  private _secret?: string

  private _sessionAutoSave?: boolean

  private _m2mClientId?: string

  private _m2mClientSecret?: string

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

  get auth0Username(): string {
    return (this._e2eUsername ??= env
      .get('AUTH0_E2E_USERNAME')
      .required()
      .asString())
  }

  get auth0Password(): string {
    return (this._e2ePassword ??= env
      .get('AUTH0_E2E_PASSWORD')
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

  get sessionAutoSave(): boolean {
    return (this._sessionAutoSave ??= env
      .get('AUTH0_SESSION_AUTO_SAVE')
      .required()
      .asBool())
  }

  get baseUrl() {
    const auth0baseUrl = this.endpoint.webHost

    return auth0baseUrl
  }

  get m2mClientId(): string {
    return (this._m2mClientId ??= env
      .get('AUTH0_M2M_CLIENT_ID')
      .required()
      .asString())
  }

  get m2mClientSecret(): string {
    return (this._m2mClientSecret ??= env
      .get('AUTH0_M2M_CLIENT_SECRET')
      .required()
      .asString())
  }
}
