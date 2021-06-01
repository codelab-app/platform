import { registerAs } from '@nestjs/config'
import { get } from 'env-var'
import { ApolloClientTokens } from './apollo-client.tokens'

export interface ApolloClientConfig {
  endpoint: string
}

export const apolloClientConfig = registerAs(
  ApolloClientTokens.ApolloClientConfig,
  (): ApolloClientConfig => ({
    endpoint: get('CODELAB_DGRAPH_GRAPHQL_ENDPOINT').required(true).asString(),
  }),
)

export const apolloClientTestConfig = registerAs(
  ApolloClientTokens.ApolloClientConfig,
  (): ApolloClientConfig => ({
    endpoint: get('CODELAB_DGRAPH_GRAPHQL_TEST_ENDPOINT')
      .required(true)
      .asString(),
  }),
)
