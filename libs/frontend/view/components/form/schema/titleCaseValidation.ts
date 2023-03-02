import { singlySpacedTitleCaseWithNumbersRegex } from '@codelab/shared/utils'

export const titleCaseValidation = {
  pattern: singlySpacedTitleCaseWithNumbersRegex.source,
  errorMessage: 'must be in Title Case',
}
