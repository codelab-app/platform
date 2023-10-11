import { getEnv } from '@codelab/shared/config'
import { isServer } from '@codelab/shared/utils'
import { GraphQLClient } from 'graphql-request'
import type { GraphQLClientResponse } from 'graphql-request/build/cjs/types'

export const client = new GraphQLClient(getEnv().endpoint.graphqlApiProxyUrl, {
  errorPolicy: 'all',
  requestMiddleware: (request) => {
    // fetch doesn't accept relative urls on server
    if (isServer) {
      const hostname = getEnv().endpoint.platformHost
      request.url = `${hostname}${request.url}`
    }

    return request
  },
  responseMiddleware: (response: Error | GraphQLClientResponse<unknown>) => {
    if (response instanceof Error) {
      console.error(response)
    }
  },
})
