import { ClientError } from 'graphql-request'
import { getGraphQLClient } from './client'

export type GraphqlBaseQuery = {
  document: string
  variables: any
}

export const graphqlBaseQuery = async ({
  document,
  variables,
}: GraphqlBaseQuery) => {
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
