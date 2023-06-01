import { cdnEsmRegex } from '@codelab/shared/utils'

export const cdnEsmValidation = {
  errorMessage: 'Invalid CDN URL for ES module',
  pattern: cdnEsmRegex.source,
}
