import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { fetch } from 'cross-fetch'
import { Auth0Service } from '../auth0'
import {
  ApolloClientConfig,
  apolloClientConfig,
} from './config/apollo-client.config'
import { ApolloClientTokens } from './config/apollo-client.tokens'

/**
 * Used internally to access own API
 */
export const apolloClientProvider = {
  provide: ApolloClientTokens.ApolloClientProvider,
  useFactory: async (
    _apolloClientConfig: ApolloClientConfig,
    auth0Service: Auth0Service,
  ) => {
    const accessToken = await auth0Service.getAccessToken()

    const httpLink = new HttpLink({
      uri: _apolloClientConfig?.endpoint,
      credentials: 'same-origin',
      fetch,
    })

    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          authorization: `Bearer ${accessToken}`,
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
  inject: [apolloClientConfig.KEY, Auth0Service],
}
