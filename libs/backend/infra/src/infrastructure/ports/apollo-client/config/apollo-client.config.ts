import { registerAs } from '@nestjs/config'
import { ApolloClientTokens } from './apollo-client.tokens'

export interface ApolloClientConfig {
  endpoint: string
}

export const apolloClientConfig = registerAs<ApolloClientConfig>(
  ApolloClientTokens.ApolloClientConfig.toString(),
  () => ({
    endpoint: '',
  }),
)
