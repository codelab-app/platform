import { DOMAIN_GRAPHQL_ERROR_CODES } from '@codelab/frontend/abstract/core'
import { ApolloError } from 'apollo-server-micro'

export const domainExistsError = new ApolloError(
  "Cannot add  since it's already assigned to another project.",
  DOMAIN_GRAPHQL_ERROR_CODES.DOMAIN_EXIST,
)

export const domainNotFoundError = new ApolloError('Domain not found')
