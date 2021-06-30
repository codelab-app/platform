import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { Provider } from '@nestjs/common'
import { ConfigFactory } from '@nestjs/config'
import { fetch } from 'cross-fetch'
import { ApolloClientConfig } from './config/apollo-client.config'
import { ApolloClientTokens } from './config/apollo-client.tokens'

export const apolloClientProvider: (
  apolloClientConfig: ConfigFactory<ApolloClientConfig>,
) => Provider<ApolloClient<NormalizedCacheObject>> = (apolloClientConfig) => ({
  provide: ApolloClientTokens.ApolloClientProvider,
  useFactory: () => {
    const dgraphLink = new HttpLink({
      uri: apolloClientConfig()?.endpoint,
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
})
