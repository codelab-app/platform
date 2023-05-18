import type { ApolloError } from 'apollo-server-micro'

export const extractFirstGraphQlErrorCode = (error: ApolloError) =>
  error.response?.errors?.[0]?.extensions?.code
