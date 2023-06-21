import type { IVercelEnvVars } from './vercel'

export interface IGraphQLEnvVars {
  graphqlApiHost: string
  graphqlApiOrigin: string
  isLocal: boolean
  nextPublicPlatformHost: string
  protocol: string
}

export class GraphQLEnvVars implements IGraphQLEnvVars {
  private _nextPublicPlatformHost?: string

  constructor(private readonly vercel: IVercelEnvVars) {}

  get isLocal() {
    return this.graphqlApiHost.includes('127.0.0.1')
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

  get graphqlApiHost() {
    const graphqlApiHost = process.env['GRAPHQL_API_HOST']

    // if (this.vercel.isVercelPreview) {
    //   const url = this.vercel.nextPublicVercelUrl

    //   if (!url) {
    //     throw new Error('Invalid Vercel url')
    //   }

    //   return url
    // }

    if (!graphqlApiHost) {
      throw new Error('GRAPHQL_API_HOST is missing')
    }

    return graphqlApiHost
  }

  get graphqlApiOrigin() {
    return `${this.protocol}://${this.graphqlApiHost}/api/graphql`
  }

  get protocol() {
    return this.isLocal ? 'http' : 'https'
  }
}
