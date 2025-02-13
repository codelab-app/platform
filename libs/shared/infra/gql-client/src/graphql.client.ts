import type { GraphQLClientResponse } from 'graphql-request/build/legacy/helpers/types'

import { getEnv } from '@codelab/shared/config/env'
import { GraphQLClient } from 'graphql-request'

const graphqlUrl = getEnv().endpoint.apiGraphqlUrl

export const graphqlClient = new GraphQLClient(graphqlUrl.toString(), {
  errorPolicy: 'all',
  headers: {
    Connection: 'keep-alive',
    // 'Keep-Alive': 'timeout=60, max=1000',
  },
  keepalive: true,
  responseMiddleware: (response: Error | GraphQLClientResponse<unknown>) => {
    if (response instanceof Error) {
      console.error(response)
    }
  },
})
