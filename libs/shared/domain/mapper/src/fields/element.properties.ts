import type { Element } from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import { uuidRegex } from '@codelab/shared/utils'
import type { DeepPick } from 'ts-essentials'

interface ElementData {
  compositeKey: never
}

export class ElementProperties {
  static elementNameFromCompositeKey = (
    element: DeepPick<Element, ElementData>,
  ) => {
    const reg = new RegExp(`${uuidRegex.source}-`, 'gi')

    return element.compositeKey.replace(reg, '')
  }

  static elementSlugFromCompositeKey = (
    element: DeepPick<Element, ElementData>,
  ) => {
    const reg = new RegExp(`${uuidRegex.source}-`, 'gi')

    return element.compositeKey.replace(reg, '')
  }

  static elementCompositeKey = (
    elementName: string,
    closestContainerNode: IEntity,
  ) => {
    return `${closestContainerNode.id}-${elementName}`
  }
}
