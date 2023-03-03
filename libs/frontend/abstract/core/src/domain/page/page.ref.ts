import isNil from 'lodash/isNil'
import type { AnyModel, Ref } from 'mobx-keystone'
import { detach, isRefOfType, modelTypeKey, rootRef } from 'mobx-keystone'
import type { IComponent } from '../component'
import { componentRef } from '../component'
import type { IElement } from '../element'
import { elementRef } from '../element'
import type { IPage } from './page.model.interface'

export type IPageNodeRef = Ref<IComponent> | Ref<IElement>

export type IPageNode = IComponent | IElement

/**
 * Used for determining the type of a page node
 */
export const isComponentPageNodeRef = (
  node: IPageNodeRef | null,
): node is Ref<IComponent> => {
  return !isNil(node) && isRefOfType(node, componentRef)
}

export const isComponentPageNode = (
  node: IPageNode | null,
): node is IComponent => {
  return (
    !isNil(node) &&
    // `IComponent` is mobx model type
    (node as unknown as AnyModel)[modelTypeKey] === '@codelab/Component'
  )
}

/**
 * Used for determining the type of a page node
 */
export const isElementPageNodeRef = (
  node: IPageNodeRef | null,
): node is Ref<IElement> => {
  return !isNil(node) && isRefOfType(node, elementRef)
}

export const isElementPageNode = (node: IPageNode | null): node is IElement => {
  return (
    !isNil(node) &&
    // `IComponent` is mobx model type
    (node as unknown as AnyModel)[modelTypeKey] === '@codelab/Element'
  )
}

export const pageRef = rootRef<IPage>('@codelab/PageRef', {
  onResolvedValueChange: (ref, newPage, oldPage) => {
    if (oldPage && !newPage) {
      detach(ref)
    }
  },
})
