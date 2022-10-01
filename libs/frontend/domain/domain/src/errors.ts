import {
  extractFirstGraphQlErrorCode,
  UseNotifyReturnType,
} from '@codelab/frontend/shared/utils'
import { DOMAIN_GRAPHQL_ERROR_CODES } from '@codelab/shared/abstract/core'

export const handleDomainExistError = (
  error: any,
  onError: UseNotifyReturnType['onError'],
) => {
  if (
    extractFirstGraphQlErrorCode(error) ===
    DOMAIN_GRAPHQL_ERROR_CODES.DOMAIN_EXIST
  ) {
    onError("Cannot add  since it's already assigned to another project.")

    return true
  }

  return false
}
