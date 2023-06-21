import * as env from 'env-var'

export interface IEndpointEnvVars {
  /**
   * This is the Next.js middleware that forwards to the backend graphql endpoint
   */
  graphqlApiProxyUrl: string
  isLocal: boolean
  nextPublicPlatformHost: string
  /**
   * The actual backend GraphQL endpoint
   */
  platformApiGraphqlUrl: string
  platformApiHost: string
}

export class EndpointEnvVars implements IEndpointEnvVars {
  private _nextPublicPlatformHost?: string

  private _platformApiHost?: string

  get isLocal() {
    return this.graphqlApiProxyUrl.includes('127.0.0.1')
  }

  /**
   * http://127.0.0.1:4000
   */
  get platformApiHost(): string {
    return (this._platformApiHost ??= env
      .get('PLATFORM_API_HOST')
      .required()
      .asUrlString())
  }

  /**
   * http://127.0.0.1:4000/api/graphql
   */
  get platformApiGraphqlUrl(): string {
    return new URL('api/graphql', this.platformApiHost).toString()
  }

  /**
   * This is used before module is initialized, so we must access process.env
   */
  get nextPublicPlatformHost(): string {
    const nextPublicPlatformHost = process.env['NEXT_PUBLIC_PLATFORM_HOST']

    if (!nextPublicPlatformHost) {
      throw new Error('Missing "NEXT_PUBLIC_PLATFORM_HOST"')
    }

    return nextPublicPlatformHost

    // return (this._nextPublicPlatformHost ??= env
    //   .get('NEXT_PUBLIC_PLATFORM_HOST')
    //   .required()
    //   .asString())
  }

  /**
   * URL is protocol + origin
   *
   * This uses the Next.js proxy middleware
   */
  get graphqlApiProxyUrl() {
    return `${this.nextPublicPlatformHost}/api/graphql`
  }
}
