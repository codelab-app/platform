import isNil from 'lodash/isNil'
import type { AnyModel, Ref } from 'mobx-keystone'
import { detach, isRefOfType, modelTypeKey, rootRef } from 'mobx-keystone'
import { componentRef, type IComponentModel } from '../component'
import type { IElementModel } from '../element'
import { elementRef } from '../element'
import type { IPageModel } from './page.model.interface'

export type IPageNodeRef = Ref<IComponentModel> | Ref<IElementModel>

export type IPageNode = IComponentModel | IElementModel

/**
 * Used for determining the type of a page node
 */
export const isComponentPageNodeRef = (
  node: IPageNodeRef | null,
): node is Ref<IComponentModel> => {
  return !isNil(node) && isRefOfType(node, componentRef)
}

export const isComponentPageNode = (
  node: IPageNode | null,
): node is IComponentModel => {
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
): node is Ref<IElementModel> => {
  return !isNil(node) && isRefOfType(node, elementRef)
}

export const isElementPageNode = (
  node: IPageNode | null,
): node is IElementModel => {
  return (
    !isNil(node) &&
    // `IComponent` is mobx model type
    (node as unknown as AnyModel)[modelTypeKey] === '@codelab/Element'
  )
}

export const pageRef = rootRef<IPageModel>('@codelab/PageRef', {
  onResolvedValueChange: (ref, newPage, oldPage) => {
    if (oldPage && !newPage) {
      detach(ref)
    }
  },
})
