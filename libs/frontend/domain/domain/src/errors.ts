import { DOMAIN_GRAPHQL_ERROR_CODES } from '@codelab/frontend/abstract/core'
import {
  extractFirstGraphQlErrorCode,
  UseNotifyReturnType,
} from '@codelab/frontend/shared/utils'

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
