import { ErrorCode } from '@codelab/backend/abstract/types'

export const errorIfNotFound = (e: any) => {
  return (
    Array.isArray(e.response?.errors) &&
    e.response?.errors.length > 0 &&
    e.response?.errors[0] &&
    e.response?.errors[0].code === ErrorCode.NotFound
  )
}
