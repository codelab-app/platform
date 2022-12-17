import { DOMAIN_GRAPHQL_ERROR_CODES } from '@codelab/frontend/abstract/core'
import type { UseNotifyReturnType } from '@codelab/frontend/shared/utils'
import { extractFirstGraphQlErrorCode } from '@codelab/frontend/shared/utils'
import type { ApolloError } from 'apollo-server-micro'

export const handleDomainExistError = (
  error: unknown,
  onError: UseNotifyReturnType['onError'],
) => {
  if (
    extractFirstGraphQlErrorCode(error as ApolloError) ===
    DOMAIN_GRAPHQL_ERROR_CODES.DOMAIN_EXIST
  ) {
    onError("Cannot add  since it's already assigned to another project.")

    return true
  }

  return false
}
