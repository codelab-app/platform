import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { IPageNodeRef } from '../page'
import type { IElement } from './element.model.interface'

/**
 * Uses ref's only for the implementation
 *
 * Possibly could use computed tree to drive the elementTree from an original tree
 *
 * This is either a `Page` or a `Component`
 *
 * https://mobx-keystone.js.org/computed-trees
 */
export interface IElementTree {
  elements: Array<IElement>
  id: string
  name: string
  rootElement: Ref<IElement>

  descendants(subRoot: Ref<IElement>): Array<IElement>
  element(id: string): Maybe<IElement>
  getPathFromRoot(pageNode: IPageNodeRef): Array<string>
  setRootElement(elementRef: Ref<IElement>): void
}

export interface IElementTreeService {
  elementTree: IElementTree

  initTree(rootElement: IElement, elements: Array<IElement>): IElementTree
  setElementTree(elementTree: IElementTree): void
}
