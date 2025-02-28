import type { GraphQLClientResponse } from 'graphql-request/build/esm/types'

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { getEnv } from '@codelab/shared/config/env'
import { GraphQLClient } from 'graphql-request'

const graphqlUrl = getEnv().endpoint.apiGraphqlUrl

/**
 * In Node.js, the keepalive option you pass into graphql-request (or even the standard Fetch API)
 * is a browser-specific feature—part of the web spec that allows "keepalive" requests (such as
 * sending analytics beacons when a user closes a page). Node's underlying HTTP layer doesn't
 * use this parameter at all.
 */
export const graphqlClient = new GraphQLClient(graphqlUrl.toString(), {
  errorPolicy: 'all',
  responseMiddleware: (response: Error | GraphQLClientResponse<unknown>) => {
    if (response instanceof Error) {
      console.error(response)
    }
  },
})
