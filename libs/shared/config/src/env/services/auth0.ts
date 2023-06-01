/* eslint-disable @typescript-eslint/member-ordering */
import * as env from 'env-var'
import type { IGraphQLEnvVars } from './graphql'
import type { INodeEnvVars } from './node'

export interface IAuth0EnvVars {
  baseUrl: string
  clientId: string
  clientSecret: string
  cypressUsername: string
  cypressPassword: string
  issuerBaseUrl: string
  audience: string
  secret: string
}
/* *
 * https://github.com/auth0/nextjs-auth0/issues/383
 *
 * `isVercel` is runtime
 * `isVercelPreview` is build-time
 */
export class Auth0EnvVars implements IAuth0EnvVars {
  private _clientId?: string

  private _clientSecret?: string

  private _cypressUsername?: string

  private _cypressPassword?: string

  private _issuerBaseUrl?: string

  private _secret?: string

  private _audience?: string

  constructor(
    private readonly graphql: IGraphQLEnvVars,
    private readonly node: INodeEnvVars,
  ) {}

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

  get audience(): string {
    return (this._audience ??= env.get('AUTH0_AUDIENCE').required().asString())
  }

  get baseUrl() {
    const auth0baseUrl = this.graphql.nextPublicPlatformHost
    const protocol = this.graphql.isLocal ? 'http' : 'https'
    const baseUrl = `${protocol}://${auth0baseUrl}`

    return baseUrl
  }
}
