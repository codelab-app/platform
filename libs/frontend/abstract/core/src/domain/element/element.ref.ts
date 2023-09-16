import isNil from 'lodash/isNil'
import type { Ref } from 'mobx-keystone'
import { detach, isRefOfType, rootRef } from 'mobx-keystone'
import type { IComponentModel } from '../component'
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
  node: Ref<IComponentModel> | Ref<IElementModel> | null,
): node is Ref<IElementModel> => {
  return !isNil(node) && isRefOfType(node, elementRef)
}
