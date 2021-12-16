import { pascalCaseToWords } from '@codelab/shared/utils'
import { IElement } from '../element.interface'

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
