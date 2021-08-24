import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { fetch } from 'cross-fetch'
import { Auth0Service } from '../auth0'
import {
  ApolloClientConfig,
  apolloClientConfig,
} from './config/apollo-client.config'
import { ApolloClientTokens } from './config/apollo-client.tokens'

/**
 * Provider for access to api endpoint
 */
export const apolloClientProvider = {
  provide: ApolloClientTokens.ApolloClientProvider,
  useFactory: async (
    _apolloClientConfig: ApolloClientConfig,
    auth0Service: Auth0Service,
  ) => {
    const accessToken = await auth0Service.getAccessToken()

    const apiLink = new HttpLink({
      uri: _apolloClientConfig?.endpoint,
      credentials: 'same-origin',
      fetch,
    })

    return new ApolloClient({
      link: apiLink,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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
