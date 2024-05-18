import { getEnv } from '@codelab/shared/config'
import type { RequestMiddleware } from 'graphql-request'
import { GraphQLClient } from 'graphql-request'
import type { GraphQLClientResponse } from 'graphql-request/build/cjs/types'

export const graphqlClient = new GraphQLClient(
  getEnv().endpoint.graphqlApiProxyUrl,
  {
    errorPolicy: 'all',
    requestMiddleware: (request: Parameters<RequestMiddleware>[0]) => {
      console.log(request)

      return request
    },
    responseMiddleware: (response: Error | GraphQLClientResponse<unknown>) => {
      if (response instanceof Error) {
        console.error(response)
      }
    },
  },
)
