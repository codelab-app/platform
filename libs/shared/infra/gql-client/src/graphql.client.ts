import type { GraphQLClientResponse } from 'graphql-request/build/legacy/helpers/types'

import { getEnv } from '@codelab/shared-config-env'
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
  // fetch: async (...args) => {
  //   // Only import node-fetch on the server side
  //   if (typeof window === 'undefined') {
  //     const { nodeFetch } = await import('./node-fetch')

  //     return nodeFetch(...args)
  //   }

  //   // Use native fetch on the client side
  //   return fetch(...args)
  // },
  headers: {
    Connection: 'keep-alive',
    'Keep-Alive': 'timeout=120, max=1000',
  },
  keepalive: true,
  responseMiddleware: (response: Error | GraphQLClientResponse<unknown>) => {
    if (response instanceof Error) {
      console.error(response)
    }
  },
})
