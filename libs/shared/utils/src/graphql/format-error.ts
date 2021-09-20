import { ApolloError } from '@apollo/client'
import { GraphQLError } from 'graphql'

export const formatError = (e: ApolloError | GraphQLError) => {
  console.log(e)

  if (e instanceof ApolloError) {
    return e.graphQLErrors[0].extensions
      ? `[${e.message}]: ${e.graphQLErrors[0].extensions.response.error}`
      : e.message
  }

  if (e.extensions) {
    return e.extensions
      ? `[${e.extensions.response.message}]: ${e.extensions.response.error}`
      : e.message
  }

  return null
}
