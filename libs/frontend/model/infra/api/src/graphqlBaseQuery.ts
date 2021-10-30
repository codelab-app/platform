import { ClientError } from 'graphql-request'
import { getGraphQLClient } from './client'

export const graphqlBaseQuery = async ({
  document,
  variables,
}: {
  document: any
  variables: any
}) => {
  try {
    const result = await getGraphQLClient().request(
      document as any,
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
