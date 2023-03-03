import isNil from 'lodash/isNil'
import type { Ref } from 'mobx-keystone'
import { isRefOfType } from 'mobx-keystone'
import type { IComponent } from '../component'
import { componentRef } from '../component'
import type { IElement } from '../element'
import { elementRef } from '../element'

export type IPageNode = Ref<IElement> | Ref<IComponent>

/**
 * Used for determining the type of a page node
 */
export const isComponentPageNodeRef = (
  node: IPageNode | null,
): node is Ref<IComponent> => {
  return !isNil(node) && isRefOfType(node, componentRef)
}

/**
 * Used for determining the type of a page node
 */
export const isElementPageNodeRef = (
  node: IPageNode | null,
): node is Ref<IElement> => {
  return !isNil(node) && isRefOfType(node, elementRef)
}
