import { getEnv } from '@codelab/shared/config'
import { GraphQLClient } from 'graphql-request'
import type { GraphQLClientResponse } from 'graphql-request/build/cjs/types'

export const client = new GraphQLClient(
  getEnv().endpoint.platformApiGraphqlUrl,
  {
    credentials: 'include',
    errorPolicy: 'all',
    responseMiddleware: (response: Error | GraphQLClientResponse<unknown>) => {
      if (response instanceof Error) {
        console.error(response)
      }
    },
  },
)
