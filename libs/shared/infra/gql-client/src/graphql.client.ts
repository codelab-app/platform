import type { GraphQLClientResponse } from 'graphql-request/build/esm/types'

import * as env from 'env-var'
import { GraphQLClient } from 'graphql-request'

const { get } = env.from({
  NEXT_PUBLIC_API_HOSTNAME: process.env['NEXT_PUBLIC_API_HOSTNAME'],
  NEXT_PUBLIC_API_PORT: process.env['NEXT_PUBLIC_API_PORT'],
  NEXT_PUBLIC_BASE_API_PATH: process.env['NEXT_PUBLIC_BASE_API_PATH'],
  NEXT_PUBLIC_WEB_HOST: process.env['NEXT_PUBLIC_WEB_HOST'],
})

const graphqlUrl = new URL(
  'api/v1/graphql',
  `http://127.0.0.1:${get('NEXT_PUBLIC_API_PORT').required().asPortNumber()}`,
)

export const graphqlClient = new GraphQLClient(graphqlUrl.toString(), {
  errorPolicy: 'all',
  responseMiddleware: (response: Error | GraphQLClientResponse<unknown>) => {
    if (response instanceof Error) {
      console.error(response)
    }
  },
})
