import { registerAs } from '@nestjs/config'
import { get } from 'env-var'
import { ApolloClientTokens } from './apollo-client.tokens'

export interface ApolloClientConfig {
  endpoint: string
}

export const apolloClientConfig = registerAs<ApolloClientConfig>(
  ApolloClientTokens.ApolloClientConfig.toString(),
  () => ({
    endpoint: new URL(
      'graphql',
      get('CODELAB_API_ENDPOINT').required().asUrlString(),
    ).toString(),
  }),
)
