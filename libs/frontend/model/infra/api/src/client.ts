import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { GraphQLClient } from 'graphql-request'
import type { RequestInit } from 'graphql-request/dist/types.dom'
import { API_ENV } from './GraphqlOperationOptions'

const apiUrlsByEnv: Record<API_ENV, string> = {
  local: `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/graphql`,
  production: `${process.env.NEXT_PUBLIC_PRODUCTION_API_ORIGIN}/api/graphql`,
}

let localGraphqlClient: Maybe<GraphQLClient>
let productionGraphqlClient: Maybe<GraphQLClient>

export const getGraphQLClient = (
  options?: Nullable<RequestInit & { env?: API_ENV }>,
) => {
  const apiEnv = options?.env || API_ENV.local
  const apiUrl = apiUrlsByEnv[apiEnv]

  if (apiEnv === API_ENV.local) {
    if (!localGraphqlClient) {
      localGraphqlClient = new GraphQLClient(apiUrl, options ?? undefined)
    }

    return localGraphqlClient
  }

  // production graphql client
  if (!productionGraphqlClient) {
    productionGraphqlClient = new GraphQLClient(apiUrl, options ?? undefined)
  }

  return productionGraphqlClient
}
