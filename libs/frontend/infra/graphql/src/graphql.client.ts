import { getEnv } from '@codelab/shared/config'
import { GraphQLClient } from 'graphql-request'
import type { GraphQLClientResponse } from 'graphql-request/build/cjs/types'

export const graphqlClient = new GraphQLClient(
  getEnv().endpoint.graphqlApiProxyUrl,
  {
    errorPolicy: 'all',
    responseMiddleware: (response: Error | GraphQLClientResponse<unknown>) => {
      if (response instanceof Error) {
        console.error(response)
      }
    },
  },
)
