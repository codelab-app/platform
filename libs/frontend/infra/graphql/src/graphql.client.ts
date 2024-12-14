import type { RequestMiddleware } from 'graphql-request'
import type { GraphQLClientResponse } from 'graphql-request/build/cjs/types'

import { getEnv } from '@codelab/shared/config/env'
import { GraphQLClient } from 'graphql-request'

export const graphqlClient = new GraphQLClient(
  getEnv().endpoint.webGraphqlUrl,
  {
    errorPolicy: 'all',
    requestMiddleware: (request: Parameters<RequestMiddleware>[0]) => {
      // console.log(request)

      return request
    },
    responseMiddleware: (response: Error | GraphQLClientResponse<unknown>) => {
      if (response instanceof Error) {
        console.error(response)
      }
    },
  },
)
