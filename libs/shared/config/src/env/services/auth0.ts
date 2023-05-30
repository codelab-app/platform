/* eslint-disable @typescript-eslint/member-ordering */
import * as env from 'env-var'
import type { IEnvironmentVariables } from '../env'

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
  readonly clientId: string

  readonly clientSecret: string

  readonly cypressUsername: string

  readonly cypressPassword: string

  readonly issuerBaseUrl: string

  readonly secret: string

  readonly audience: string

  constructor(private readonly environment: IEnvironmentVariables) {
    this.clientId = env.get('AUTH0_CLIENT_ID').required().asString()
    this.clientSecret = env.get('AUTH0_CLIENT_SECRET').required().asString()
    this.cypressUsername = env
      .get('AUTH0_CYPRESS_USERNAME')
      .required()
      .asString()
    this.cypressPassword = env
      .get('AUTH0_CYPRESS_PASSWORD')
      .required()
      .asString()
    this.issuerBaseUrl = env.get('AUTH0_ISSUER_BASE_URL').required().asString()
    this.secret = env.get('AUTH0_SECRET').required().asString()
    this.audience = env.get('AUTH0_AUDIENCE').required().asString()
  }

  get baseUrl() {
    const auth0baseUrl = this.environment.graphql.nextPublicPlatformHost
    // const isDev = auth0baseUrl.startsWith('127.0.0.1')
    const protocol = this.environment.node.isDevelopment ? 'http' : 'https'
    const baseUrl = `${protocol}://${auth0baseUrl}`

    return baseUrl
  }

  get demo_url() {
    return null
  }
}
