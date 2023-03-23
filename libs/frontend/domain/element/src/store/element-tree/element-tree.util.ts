import type {
  IComponent,
  IElement,
  IElementTree,
  IPage,
} from '@codelab/frontend/abstract/core'
import { elementRef } from '@codelab/frontend/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { AnyModel } from 'mobx-keystone'
import { findParent, getRefsResolvingTo, modelTypeKey } from 'mobx-keystone'

/**
 * Since an element can have a ref that belongs to an element tree, this allows us to search for the element tree it belongs to.
 *
 * We need to find the rootElement of each element, since only the root is attached to the elementTree
 *
 * Any element ref should only belong to a page or component.
 */
export const getElementTree = (element: IElement): IElementTree => {
  const rootElement = element.rootElement
  const refs = getRefsResolvingTo<IElement>(rootElement, elementRef)

  const elementTree = [...refs.values()].reduce<Maybe<IComponent | IPage>>(
    (prev, node) => {
      const currentTree = findParent(node, (parent) => {
        const model = (parent as AnyModel)[modelTypeKey]

        // Return when we find the container that holds the element ref
        return model === '@codelab/Page' || model === '@codelab/Component'
      })

      return currentTree ? currentTree : prev
    },
    undefined,
  )

  if (!elementTree) {
    throw new Error(`Element tree is missing for ${element.name}.`)
  }

  return elementTree
}
