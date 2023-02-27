import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { INode } from '../builder'
import type { IElement } from './element.model.interface'

/**
 * Uses ref's only for the implementation
 *
 * Possibly could use computed tree to drive the elementTree from an original tree
 *
 * https://mobx-keystone.js.org/computed-trees
 */
export interface IElementTree {
  id: string
  _root: Nullable<Ref<IElement>>
  root: Maybe<IElement>
  elements: Array<IElement>
  getPathFromRoot(element: INode): Array<INode>
  element(id: string): Maybe<IElement>
  addElements(elements: Array<IElement>): IElementTree
  removeElements(elements: Array<IElement>): IElementTree
}

export interface IElementTreeService {
  elementTree: Maybe<IElementTree>
  setElementTree(t: IElementTree): void
  initTree(rootElement: IElement, elements: Array<IElement>): IElementTree
}
