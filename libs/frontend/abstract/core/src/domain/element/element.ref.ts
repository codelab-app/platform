import isNil from 'lodash/isNil'
import type { Ref } from 'mobx-keystone'
import { detach, isRefOfType, rootRef } from 'mobx-keystone'
import type { IComponent } from '../component'
import type { IElement } from './element.model.interface'

export const elementRef = rootRef<IElement>('@codelab/ElementRef', {
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
  node: Ref<IElement> | Ref<IComponent> | null,
): node is Ref<IElement> => {
  return !isNil(node) && isRefOfType(node, elementRef)
}
