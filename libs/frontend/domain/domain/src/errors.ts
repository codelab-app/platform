import { DOMAIN_GRAPHQL_ERROR_CODES } from '@codelab/frontend/abstract/core'
import {
  extractFirstGraphQlErrorCode,
  UseNotifyReturnType,
} from '@codelab/frontend/shared/utils'
import { ApolloError } from 'apollo-server-micro'

export const handleDomainExistError = (
  error: unknown,
  onError: UseNotifyReturnType['onError'],
) => {
  if (
    error instanceof ApolloError &&
    extractFirstGraphQlErrorCode(error) ===
      DOMAIN_GRAPHQL_ERROR_CODES.DOMAIN_EXIST
  ) {
    onError("Cannot add  since it's already assigned to another project.")

    return true
  }

  return false
}
