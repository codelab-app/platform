import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { fetch } from 'cross-fetch'
import { ApolloClientConfig } from './config/apollo-client.config'
import { ApolloClientTokens } from './config/apollo-client.tokens'

@Injectable()
/**
 * Creates and manages an instance of an ApolloClient
 */
export class ApolloClientService {
  private _client: ApolloClient<any> | undefined

  private _config: ApolloClientConfig

  constructor(configService: ConfigService) {
    const config = configService.get<ApolloClientConfig>(
      ApolloClientTokens.ApolloClientConfig,
    )

    if (!config) {
      throw new Error('No apollo client config found')
    }

    this._config = config
  }

  getClient(): ApolloClient<any> {
    if (!this._client) {
      this._client = this.createClient()
    }

    return this._client
  }

  createClient(): ApolloClient<any> {
    const dgraphLink = new HttpLink({
      uri: this._config.endpoint,
      credentials: 'same-origin',
      fetch,
    })

    //Don't use cache, because if we modify the db outside of apollo
    //for example - with dql, the cache won't be updated, so it's not reliable at all
    //PS: if we won't use caching, why not use some kind of a simpler graphql client, with less overhead?
    return new ApolloClient({
      link: dgraphLink,
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
  }
}
