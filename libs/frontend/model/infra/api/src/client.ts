import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { GraphQLClient } from 'graphql-request'
import type { RequestInit } from 'graphql-request/dist/types.dom'

const API_URL = `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/graphql`
let client: Maybe<GraphQLClient>

export const getGraphQLClient = (options?: Nullable<RequestInit>) => {
  if (!client) {
    client = new GraphQLClient(API_URL, options ?? undefined)
  }

  return client
}
