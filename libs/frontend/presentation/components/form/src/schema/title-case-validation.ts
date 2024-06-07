import { singlySpacedTitleCaseWithNumbersRegex } from '@codelab/shared/utils'

export const titleCaseValidation = {
  errorMessage: 'must be in Title Case',
  pattern: singlySpacedTitleCaseWithNumbersRegex.source,
}
