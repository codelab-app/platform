import type { GraphQLClientResponse } from 'graphql-request/build/esm/types'

import * as env from 'env-var'
import { GraphQLClient } from 'graphql-request'

const graphqlUrl = new URL(
  'api/v1/graphql',
  `http://127.0.0.1:${env
    .get('NEXT_PUBLIC_API_PORT')
    .required()
    .asPortNumber()}`,
)

export const graphqlClient = new GraphQLClient(graphqlUrl.toString(), {
  errorPolicy: 'all',
  responseMiddleware: (response: Error | GraphQLClientResponse<unknown>) => {
    if (response instanceof Error) {
      console.error(response)
    }
  },
})
