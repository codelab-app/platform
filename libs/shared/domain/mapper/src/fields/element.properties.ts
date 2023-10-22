import type { Element } from '@codelab/shared/abstract/codegen'
import type { IRef } from '@codelab/shared/abstract/core'
import { uuidRegex } from '@codelab/shared/utils'
import type { DeepPick } from 'ts-essentials'

interface ElementData {
  compositeKey: never
}

export class ElementProperties {
  static elementCompositeKey = (
    elementName: string,
    closestContainerNode: IRef,
  ) => {
    return `${closestContainerNode.id}-${elementName}`
  }

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
}
