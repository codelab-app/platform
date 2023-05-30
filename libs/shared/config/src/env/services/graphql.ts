import * as env from 'env-var'
import type { IEnvironmentVariables } from '../env'
import { Env } from '../env'

export interface IGraphQLEnvVars {
  graphqlApiHost: string
  graphqlApiOrigin: string
  nextPublicPlatformHost: string
  protocol: string
}

export class GraphQLEnvVars implements IGraphQLEnvVars {
  readonly nextPublicPlatformHost: string

  constructor(private readonly environment: IEnvironmentVariables) {
    this.nextPublicPlatformHost = env
      .get('NEXT_PUBLIC_PLATFORM_HOST')
      .required()
      .asString()
  }

  get graphqlApiHost() {
    return Env.environment.isVercelPreview
      ? this.environment.vercel.nextPublicVercelEnv
      : this.nextPublicPlatformHost
  }

  get graphqlApiOrigin() {
    return `${this.protocol}://${this.graphqlApiHost}/api/graphql`
  }

  get protocol() {
    return Env.node.isDevelopment ? 'http' : 'https'
  }
}
