import { GraphQLClient } from 'graphql-request'

const API_ROUTE = '/api/graphql'
let client: GraphQLClient | undefined

export const getGraphQLClient = () => {
  if (!client) {
    client = new GraphQLClient(API_ROUTE)
  }

  return client
}
