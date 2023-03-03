import type { IElement, IElementTree } from '@codelab/frontend/abstract/core'
import { elementRef } from '@codelab/frontend/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { AnyModel } from 'mobx-keystone'
import { findParent, getRefsResolvingTo, modelTypeKey } from 'mobx-keystone'

/**
 * Since an element can have a ref that belongs to an element tree, this allows us to search for the element tree it belongs to.
 */
export const getElementTree = (element: IElement): Maybe<IElementTree> => {
  const refs = getRefsResolvingTo<IElement>(element, elementRef)

  return [...refs.values()].reduce((prev, node) => {
    const elementTree = findParent(node, (parent) => {
      return (parent as AnyModel)[modelTypeKey] === '@codelab/ElementTree'
    })

    return elementTree ? elementTree : prev
  }, undefined)
}
