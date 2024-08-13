import * as env from 'env-var'
import { GraphQLClient } from 'graphql-request'
import type { GraphQLClientResponse } from 'graphql-request/build/esm/types'

const graphqlUrl = new URL(
  'api/v1/graphql',
  `http://localhost:${env
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
