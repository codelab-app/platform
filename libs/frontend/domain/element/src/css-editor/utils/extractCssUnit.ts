import type { Nullable } from '@codelab/shared/abstract/types'

const cssUnitRegExp = new RegExp(/[a-z]+|%/)

/**
 * Extracts the first matching css unit from the value of a css prop.
 * @param str
 * @returns
 */
export const extractCssUnit = (str: string): Nullable<string> => {
  return cssUnitRegExp.exec(str)?.[0] ?? null
}
