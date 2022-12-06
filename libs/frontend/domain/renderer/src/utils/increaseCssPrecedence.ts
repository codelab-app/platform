import { mapDeep } from '@codelab/shared/utils'
import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'

export const increaseCssPrecedence = (
  guiCss: string | Record<string, unknown>,
) => {
  const parsedStyleObject =
    typeof guiCss === 'string' ? JSON.parse(guiCss) : guiCss

  return mapDeep(parsedStyleObject, (value) =>
    isNumber(value) || isString(value) ? `${value} !important;` : value,
  )
}
