import { ClientError } from 'graphql-request'
import { RequestDocument } from 'graphql-request/dist/types'
import { getGraphQLClient } from './client'

export const graphqlBaseQuery = async ({
  document,
  variables,
}: {
  document: RequestDocument
  variables: any
}) => {
  try {
    const result = await getGraphQLClient().request(
      document,
      variables?.variables,
    )

    return { data: result }
  } catch (error) {
    if (error instanceof ClientError) {
      return { error: { status: error.response.status, data: error } }
    }

    return { error: { status: 500, data: error } }
  }
}
