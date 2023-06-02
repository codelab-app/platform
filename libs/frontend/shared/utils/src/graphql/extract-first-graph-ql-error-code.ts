import type { ApolloError } from '@apollo/client'

export const extractFirstGraphQlErrorCode = (error: ApolloError) =>
  error.graphQLErrors[0]?.extensions?.code
