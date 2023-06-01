import * as env from 'env-var'
import type { INodeEnvVars } from './node'
import type { IVercelEnvVars } from './vercel'

export interface IGraphQLEnvVars {
  graphqlApiHost: string
  graphqlApiOrigin: string
  nextPublicPlatformHost: string
  protocol: string
}

export class GraphQLEnvVars implements IGraphQLEnvVars {
  private _nextPublicPlatformHost?: string

  constructor(
    private readonly vercel: IVercelEnvVars,
    private readonly node: INodeEnvVars,
  ) {}

  get nextPublicPlatformHost(): string {
    return (this._nextPublicPlatformHost ??= env
      .get('NEXT_PUBLIC_PLATFORM_HOST')
      .required()
      .asString())
  }

  get graphqlApiHost() {
    if (this.vercel.isVercelPreview) {
      const url = this.vercel.nextPublicVercelUrl

      if (!url) {
        throw new Error('Invalid Vercel url')
      }

      return url
    }

    return this.nextPublicPlatformHost
  }

  get graphqlApiOrigin() {
    return `${this.protocol}://${this.graphqlApiHost}/api/graphql`
  }

  get protocol() {
    return this.node.isDevelopment ? 'http' : 'https'
  }
}
