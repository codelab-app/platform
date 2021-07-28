import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { fetch } from 'cross-fetch'
import {
  ApolloClientConfig,
  apolloClientConfig,
} from './config/apollo-client.config'
import { ApolloClientTokens } from './config/apollo-client.tokens'

export const apolloClientProvider = {
  provide: ApolloClientTokens.ApolloClientProvider,
  useFactory: (_apolloClientConfig: ApolloClientConfig) => {
    const dgraphLink = new HttpLink({
      uri: _apolloClientConfig?.endpoint,
      credentials: 'same-origin',
      fetch,
    })

    return new ApolloClient({
      link: dgraphLink,
      headers: {
        'DG-AUTH': process.env.CODELAB_DGRAPH_API_KEY ?? '',
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
  inject: [apolloClientConfig.KEY],
}
