import type { Element } from '@codelab/shared/abstract/codegen'
import { uuidRegex } from '@codelab/shared/utils'

export const refKey = (element: Element) => {
  const reg = new RegExp(`${uuidRegex.source}-`, 'gi')

  return element._compoundRefKey?.replace(reg, '')
}
