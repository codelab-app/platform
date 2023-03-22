import type {
  IElement,
  IElementTree,
  IPage,
} from '@codelab/frontend/abstract/core'
import { elementRef } from '@codelab/frontend/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { AnyModel, Ref } from 'mobx-keystone'
import { findParent, getRefsResolvingTo, modelTypeKey } from 'mobx-keystone'

/**
 * Since an element can have a ref that belongs to an element tree, this allows us to search for the element tree it belongs to.
 *
 * We need to find the rootElement of each element, since only the root is attached to the elementTree
 *
 * Any element ref should only belong to a page or component.
 */
export const getElementTree = (element: IElement): Maybe<IElementTree> => {
  const rootElement = element.rootElement
  const refs = getRefsResolvingTo<IElement>(rootElement, elementRef)

  return [...refs.values()].reduce((prev, node) => {
    const elementTree = findParent(node, (parent) => {
      const model = (parent as AnyModel)[modelTypeKey]

      // Return when we find the container that holds the element ref
      return model === '@codelab/Page' || model === '@codelab/Component'
    })

    return elementTree ? elementTree : prev
  }, undefined)
}
