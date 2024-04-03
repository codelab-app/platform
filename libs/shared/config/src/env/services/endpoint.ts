import * as env from 'env-var'

/**
 * https://github.com/evanshortiss/env-var/issues/162
 */
const { get } = env.from({
  NEXT_PUBLIC_API_HOSTNAME: process.env['NEXT_PUBLIC_API_HOSTNAME'],
  NEXT_PUBLIC_API_PORT: process.env['NEXT_PUBLIC_API_PORT'],
  NEXT_PUBLIC_WEB_HOST: process.env['NEXT_PUBLIC_WEB_HOST'],
})

export interface IEndpointEnvVars {
  /**
   * The actual backend GraphQL endpoint
   */
  apiGraphqlUrl: string
  apiHost: string
  /**
   * Used to secure pages on production
   */
  canActivateUrl: string
  /**
   * This is the Next.js middleware that forwards to the backend graphql endpoint
   */
  graphqlApiProxyUrl: string
  isLocal: boolean
  webHost: string
}

export class EndpointEnvVars implements IEndpointEnvVars {
  /**
   * http://127.0.0.1:4000/api/graphql
   */
  get apiGraphqlUrl(): string {
    return new URL('api/graphql', this.apiHost).toString()
  }

  /**
   * http://127.0.0.1:4000
   */
  get apiHost(): string {
    if (this._apiHost) {
      return this._apiHost
    }

    const port = get('NEXT_PUBLIC_API_PORT').required().asPortNumber()
    const url = get('NEXT_PUBLIC_API_HOSTNAME').required().asUrlObject()

    return (this._apiHost = new URL(`${url.origin}:${port}`).toString())
  }

  /**
   * URL is protocol + origin
   */
  get canActivateUrl() {
    return new URL('api/can-activate', this.apiHost).toString()
  }

  /**
   * URL is protocol + origin
   *
   * This uses the Next.js proxy middleware
   */
  get graphqlApiProxyUrl() {
    return new URL('api/graphql', this.webHost).toString()
  }

  get isLocal() {
    return this.graphqlApiProxyUrl.includes('127.0.0.1')
  }

  /**
   * This is used before module is initialized, so we must access process.env
   */
  get webHost(): string {
    return (this._webHost ??= get('NEXT_PUBLIC_WEB_HOST').required().asString())
  }

  private _apiHost?: string

  private _webHost?: string
}
