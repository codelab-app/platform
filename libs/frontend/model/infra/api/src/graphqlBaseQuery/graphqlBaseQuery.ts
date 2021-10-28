import { ClientError } from 'graphql-request'
import { client } from '../client'
import { BaseQuery } from './types'

const graphqlBaseQuery = async ({ document, variables }: BaseQuery) => {
  try {
    const result = await client.request(document, variables?.variables)

    return { data: result }
  } catch (error) {
    if (error instanceof ClientError) {
      return { error: { status: error.response.status, data: error } }
    }

    return { error: { status: 500, data: error } }
  }
}

export { graphqlBaseQuery }
