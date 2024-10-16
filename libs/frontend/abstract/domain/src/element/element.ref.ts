import type { AnyModel, Ref } from 'mobx-keystone'

import { detach, isRefOfType, rootRef } from 'mobx-keystone'

import type { IElementModel } from './element.model.interface'

export const elementRef = rootRef<IElementModel>('@codelab/ElementRef', {
  onResolvedValueChange: (ref, newElement, oldElement) => {
    if (oldElement && !newElement) {
      detach(ref)
    }
  },
})

/**
 * Used for determining which node type is in the page tree
 */
export const isElementRef = (
  node: Ref<AnyModel>,
): node is Ref<IElementModel> => {
  return isRefOfType(node, elementRef)
}

export const isElement = (instance: AnyModel): instance is IElementModel => {
  return instance.$modelType === '@codelab/Element'
}
