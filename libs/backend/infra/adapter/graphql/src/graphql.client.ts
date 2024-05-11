import * as env from 'env-var'
import { GraphQLClient } from 'graphql-request'
import type { GraphQLClientResponse } from 'graphql-request/build/esm/types'

export const graphqlClient = new GraphQLClient(
  `http://127.0.0.1:${env
    .get('NEXT_PUBLIC_API_PORT')
    .required()
    .asPortNumber()}`,
  {
    errorPolicy: 'all',
    responseMiddleware: (response: Error | GraphQLClientResponse<unknown>) => {
      if (response instanceof Error) {
        console.error(response)
      }
    },
  },
)
