import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApolloClientConfig } from './config/apollo-client.config'
import { ApolloClientTokens } from './config/apollo-client.tokens'

export const apolloClientProvider: Provider<
  ApolloClient<NormalizedCacheObject>
> = {
  provide: ApolloClientTokens.ApolloClientProvider,
  useFactory: (configService: ConfigService) => {
    const config = configService.get<ApolloClientConfig>(
      ApolloClientTokens.ApolloClientConfig.toString(),
    )

    const dgraphLink = new HttpLink({
      uri: config?.endpoint,
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
  inject: [ConfigService],
}
