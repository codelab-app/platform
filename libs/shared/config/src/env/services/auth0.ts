/* eslint-disable @typescript-eslint/member-ordering */
import * as env from 'env-var'
import type { IEndpointEnvVars } from './endpoint'

export interface IAuth0EnvVars {
  baseUrl: string
  clientId: string
  clientSecret: string
  cypressUsername: string
  cypressPassword: string
  issuerBaseUrl: string
  secret: string
  cookieDomain?: string
}

export class Auth0EnvVars implements IAuth0EnvVars {
  private _clientId?: string

  private _clientSecret?: string

  private _cypressUsername?: string

  private _cypressPassword?: string

  private _issuerBaseUrl?: string

  private _secret?: string

  constructor(private readonly endpoint: IEndpointEnvVars) {}

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
    return (this._issuerBaseUrl ??= env
      .get('AUTH0_ISSUER_BASE_URL')
      .required()
      .asString())
  }

  get secret(): string {
    return (this._secret ??= env.get('AUTH0_SECRET').required().asString())
  }

  get baseUrl() {
    const auth0baseUrl = this.endpoint.platformHost

    return auth0baseUrl
  }

  /* *
   * Gets the cookie base domain:
   * - for local development, it's undefined to fallback to default logic
   * - for production, this would be `.codelab.app`, this allows cookies
   *   to be shared across subdomains, in our case to include cookies set
   *   on the client admin.codelab.app to the backend api.codelab.app
   */
  get cookieDomain() {
    if (this.endpoint.isLocal) {
      return undefined
    }

    const domainParts = this.endpoint.platformApiHost.split('.')
    const subdomain = domainParts.shift()
    const baseDomain = domainParts.join('.')
    const domainWithoutTrailingSlash = baseDomain.replace(/\/$/, '')

    return `.${domainWithoutTrailingSlash}`
  }
}
