import type { Element } from '@codelab/shared/infra/gql'
import type { IRef } from '@codelab/shared/abstract/core'
import { uuidRegex } from '@codelab/shared/utils'
import type { DeepPick } from 'ts-essentials'

interface ElementData {
  compositeKey: never
}

const elementCompositeKey = (
  elementName: string,
  closestContainerNode: IRef,
) => {
  return `${closestContainerNode.id}-${elementName}`
}

const elementNameFromCompositeKey = (
  element: DeepPick<Element, ElementData>,
) => {
  const reg = new RegExp(`${uuidRegex.source}-`, 'gi')

  return element.compositeKey.replace(reg, '')
}

const elementSlugFromCompositeKey = (
  element: DeepPick<Element, ElementData>,
) => {
  const reg = new RegExp(`${uuidRegex.source}-`, 'gi')

  return element.compositeKey.replace(reg, '')
}

export const ElementProperties = {
  elementCompositeKey,
  elementNameFromCompositeKey,
  elementSlugFromCompositeKey,
}
