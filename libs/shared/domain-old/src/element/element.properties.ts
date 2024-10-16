import type { IRef } from '@codelab/shared/abstract/core'
import type { Element } from '@codelab/shared/infra/gql'
import type { DeepPick } from 'ts-essentials'

import { removeUuidAndDashPrefix, titleCase } from '@codelab/shared/utils'

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
  const slug = elementSlugFromCompositeKey(element)

  return titleCase(slug)
}

const elementSlugFromCompositeKey = (
  element: DeepPick<Element, ElementData>,
) => {
  const slug = removeUuidAndDashPrefix(element.compositeKey)

  return slug
}

export const ElementProperties = {
  elementCompositeKey,
  elementNameFromCompositeKey,
  elementSlugFromCompositeKey,
}
