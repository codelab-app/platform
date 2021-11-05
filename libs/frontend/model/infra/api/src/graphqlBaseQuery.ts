import { ClientError } from 'graphql-request'
import { RequestDocument } from 'graphql-request/dist/types'
import { getGraphQLClient } from './client'
import { GraphqlOperationOptions } from './GraphqlOperationOptions'

export interface GraphqlQueryInput {
  document: RequestDocument
  options?: GraphqlOperationOptions
}

export const graphqlBaseQuery = async ({
  document,
  options: { variables, ...options } = {},
}: GraphqlQueryInput) => {
  try {
    const result = await getGraphQLClient(options).request(document, variables)

    return { data: result }
  } catch (error) {
    if (error instanceof ClientError) {
      return { error: { status: error.response.status, data: error } }
    }

    return { error: { status: 500, data: error } }
  }
}
