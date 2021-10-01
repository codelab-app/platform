import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { FactoryProvider } from '@nestjs/common'
import { fetch } from 'cross-fetch'
import {
  ApolloClientConfig,
  apolloClientConfig,
} from './config/apollo-client.config'
import { ApolloClientTokens } from './config/apollo-client.tokens'

/**
 * Used internally to access own API.
 *
 * We don't want to fetch token here, because this would be called before module initialization. Instead call before the actual usage of the client
 */
export const apolloClientProvider: FactoryProvider = {
  provide: ApolloClientTokens.ApolloClientProvider,
  useFactory: async (_apolloClientConfig: ApolloClientConfig) => {
    const httpLink = new HttpLink({
      uri: _apolloClientConfig?.endpoint,
      credentials: 'same-origin',
      fetch,
    })

    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          // authorization: `Bearer ${accessToken}`,
        },
      }))

      return forward(operation)
    })

    return new ApolloClient({
      link: from([authMiddleware, httpLink]),
      cache: new InMemoryCache(),
      ssrMode: true,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache',
        },
        query: {
          fetchPolicy: 'no-cache',
        },
        mutate: {
          fetchPolicy: 'no-cache',
        },
      },
    })
  },
  inject: [apolloClientConfig.KEY],
}
