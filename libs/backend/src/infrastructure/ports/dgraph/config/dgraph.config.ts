import { registerAs } from '@nestjs/config'
import { get } from 'env-var'
import { DgraphTokens } from './dgraph.tokens'

export interface DgraphConfig {
  grpcEndpoint: string
  endpoint: string
  apiKey?: string
  graphqlEndpoint: string
}

export const dgraphConfig = registerAs<() => DgraphConfig>(
  DgraphTokens.DgraphConfig.toString(),
  () => ({
    grpcEndpoint: get('CODELAB_DGRAPH_GRPC_ENDPOINT').required().asString(),
    endpoint: get('CODELAB_DGRAPH_ENDPOINT').required().asUrlString(),
    graphqlEndpoint: get('CODELAB_DGRAPH_GRAPHQL_ENDPOINT')
      .required()
      .asUrlString(),
    apiKey: get('CODELAB_DGRAPH_API_KEY').asString(),
  }),
)
