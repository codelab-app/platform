import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { IPageNodeRef } from '../page'
import type { IElement } from './element.model.interface'

/**
 * Uses ref's only for the implementation
 *
 * Possibly could use computed tree to drive the elementTree from an original tree
 *
 * https://mobx-keystone.js.org/computed-trees
 */
export interface IElementTree {
  _root: Nullable<Ref<IElement>>
  elements: Array<IElement>
  id: string
  name: string
  root: Maybe<IElement>
  addElements(elements: Array<IElement>): IElementTree
  descendants(subRoot: Ref<IElement>): Array<IElement>
  element(id: string): Maybe<IElement>
  getPathFromRoot(pageNode: IPageNodeRef): Array<string>
  removeElements(elements: Array<IElement>): IElementTree
}

export interface IElementTreeService {
  elementTree: IElementTree
  initTree(rootElement: IElement, elements: Array<IElement>): IElementTree
  setElementTree(elementTree: IElementTree): void
}
