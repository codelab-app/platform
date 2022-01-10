import { IElement } from '@codelab/shared/abstract/core'
import { pascalCaseToWords } from '@codelab/shared/utils'

/**
 * Generates a default element name based on the element's name or atom
 */
export const defaultElementName = (element: IElement) => {
  if (element.name) {
    return element.name
  }

  if (element.atom?.name) {
    return element.atom.name
  }

  if (element.atom?.type) {
    return pascalCaseToWords(element.atom.type)
  }

  return undefined
}
