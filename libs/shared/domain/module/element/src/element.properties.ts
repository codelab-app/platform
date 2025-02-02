import type { IElementDto, IRef } from '@codelab/shared/abstract/core'
import type { Element } from '@codelab/shared/infra/gqlgen'
import type { DeepPick } from 'ts-essentials'

import {
  removeUuidAndDashPrefix,
  slugify,
  titleCase,
} from '@codelab/shared/utils'

interface ElementData {
  compositeKey: never
}

const elementCompositeKey = (
  element: Pick<IElementDto, 'name'>,
  closestContainerNode: IRef,
) => {
  return `${closestContainerNode.id}-${slugify(element.name)}`
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
