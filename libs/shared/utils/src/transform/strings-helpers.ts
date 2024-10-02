import { Case } from 'change-case-all'
import { pipe } from 'remeda'

/**
 * Splits to space by capital and dashes
 *
 * @deprecated Used internally
 */
export const _splitByCapital = (str: string) => str.split(/(?=[A-Z])/).join(' ')

/**
 * Splits to space by capital and dashes
 *
 * @deprecated Used internally
 */
export const _spacedLowerCase = (input: string) => {
  return pipe(input, _splitByCapital, Case.no)

  // This doesn't work since it does no case first before splitting
  // Case.no(input, {
  //   delimiter: ' ',
  // })
}
