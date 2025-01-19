import type { GraphQLClientResponse } from 'graphql-request/build/esm/types'

import { getEnv } from '@codelab/shared/config/env'
import { GraphQLClient } from 'graphql-request'

const graphqlUrl = getEnv().endpoint.apiGraphqlUrl

export const graphqlClient = new GraphQLClient(graphqlUrl.toString(), {
  errorPolicy: 'all',
  responseMiddleware: (response: Error | GraphQLClientResponse<unknown>) => {
    if (response instanceof Error) {
      console.error(response)
    }
  },
})
