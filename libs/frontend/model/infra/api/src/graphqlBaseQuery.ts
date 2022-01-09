import { Nullable } from '@codelab/shared/abstract/types'
import { ClientError } from 'graphql-request'
import { RequestDocument } from 'graphql-request/dist/types'
import { getGraphQLClient } from './client'
import { GraphqlOperationOptions } from './GraphqlOperationOptions'

export interface GraphqlQueryInput {
  document: RequestDocument
  options?: Nullable<GraphqlOperationOptions>
}

export const graphqlBaseQuery = async ({
  document,
  options = {},
}: GraphqlQueryInput) => {
  const { variables, ...restOptions } = options || {}

  try {
    const result = await getGraphQLClient(restOptions).request(
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
