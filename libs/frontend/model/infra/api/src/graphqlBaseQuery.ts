import { ClientError } from 'graphql-request'
import { getGraphQLClient } from './client'

export const graphqlBaseQuery = async ({
  document,
  variables,
}: {
  document: TemplateStringsArray
  variables: any
}) => {
  try {
    const result = await getGraphQLClient().request(variables?.variables)

    return { data: result }
  } catch (error) {
    if (error instanceof ClientError) {
      return { error: { status: error.response.status, data: error } }
    }

    return { error: { status: 500, data: error } }
  }
}
