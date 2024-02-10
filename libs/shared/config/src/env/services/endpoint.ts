import * as env from 'env-var'

/**
 * https://github.com/evanshortiss/env-var/issues/162
 */
const { get } = env.from({
  NEXT_PUBLIC_PLATFORM_API_HOST: process.env['NEXT_PUBLIC_PLATFORM_API_HOST'],
  NEXT_PUBLIC_PLATFORM_API_PORT: process.env['NEXT_PUBLIC_PLATFORM_API_PORT'],
  NEXT_PUBLIC_PLATFORM_HOST: process.env['NEXT_PUBLIC_PLATFORM_HOST'],
})

export interface IEndpointEnvVars {
  /**
   * This is the Next.js middleware that forwards to the backend graphql endpoint
   */
  graphqlApiProxyUrl: string
  isLocal: boolean
  /**
   * The actual backend GraphQL endpoint
   */
  platformApiGraphqlUrl: string
  platformApiHost: string
  platformHost: string
}

export class EndpointEnvVars implements IEndpointEnvVars {
  /**
   * URL is protocol + origin
   *
   * This uses the Next.js proxy middleware
   */
  get graphqlApiProxyUrl() {
    return `${this.platformHost}/api/graphql`
  }

  get isLocal() {
    return this.graphqlApiProxyUrl.includes('127.0.0.1')
  }

  /**
   * http://127.0.0.1:4000/api/graphql
   */
  get platformApiGraphqlUrl(): string {
    return new URL('api/graphql', this.platformApiHost).toString()
  }

  /**
   * http://127.0.0.1:4000
   */
  get platformApiHost(): string {
    if (this._platformApiHost) {
      return this._platformApiHost
    }

    const port = get('NEXT_PUBLIC_PLATFORM_API_PORT').required().asPortNumber()
    const url = get('NEXT_PUBLIC_PLATFORM_API_HOST').required().asUrlObject()

    return (this._platformApiHost = new URL(`${url.origin}:${port}`).toString())
  }

  /**
   * This is used before module is initialized, so we must access process.env
   */
  get platformHost(): string {
    return (this._platformHost ??= get('NEXT_PUBLIC_PLATFORM_HOST')
      .required()
      .asString())
  }

  private _platformApiHost?: string

  private _platformHost?: string
}
