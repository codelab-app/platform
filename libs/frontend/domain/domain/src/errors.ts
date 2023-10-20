import type { ApolloError } from '@apollo/client'
import { extractFirstGraphQlErrorCode } from '@codelab/frontend/shared/utils'
import { DOMAIN_GRAPHQL_ERROR_CODES } from '@codelab/shared/abstract/core'

export const DOMAIN_EXISTS_ERROR = `Cannot add since it's already assigned to another project.`

export const checkDomainExists = (error: ApolloError) => {
  if (
    extractFirstGraphQlErrorCode(error) ===
    DOMAIN_GRAPHQL_ERROR_CODES.DOMAIN_EXIST
  ) {
    return true
  }

  return false
}
