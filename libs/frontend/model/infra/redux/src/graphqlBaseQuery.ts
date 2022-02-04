import { Nullable } from '@codelab/shared/abstract/types'
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query'
import { ClientError } from 'graphql-request'
import { RequestDocument } from 'graphql-request/dist/types'
import { getGraphQLClient } from './client'
import { GraphqlOperationOptions } from './GraphqlOperationOptions'

export interface GraphqlQueryInput {
  document: RequestDocument
  options?: GraphqlOperationOptions
}

export const graphqlBaseQuery: BaseQueryFn = async ({
  document,
  options = {},
}: GraphqlQueryInput) => {
  const { variables } = options

  try {
    const result = await getGraphQLClient(options).request(
      document,
      variables,
      options?.headers,
    )

    return { data: result }
  } catch (error) {
    if (error instanceof ClientError) {
      return { error: { status: error.response.status, data: error } }
    }

    return { error: { status: 500, data: error } }
  }
}
