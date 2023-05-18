import type { Nullable } from '@codelab/shared/abstract/types'

const cssNumberRegExp = new RegExp(/-?[0-9]+\.?([0-9]+)?/)

/**
 * Extracts the first matching css number from the value of a css prop.
 * @param str
 * @returns
 */
export const extractCssNumber = (str: string): Nullable<number> => {
  const match = cssNumberRegExp.exec(str)?.[0]

  if (match) {
    return parseFloat(match)
  }

  return null
}
