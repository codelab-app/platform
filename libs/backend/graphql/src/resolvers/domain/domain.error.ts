import { DOMAIN_GRAPHQL_ERROR_CODES } from '@codelab/shared/abstract/core'
import { ApolloError } from 'apollo-server-micro'

export const domainExists = new ApolloError(
  "Cannot add  since it's already assigned to another project.",
  DOMAIN_GRAPHQL_ERROR_CODES.DOMAIN_EXIST,
)
