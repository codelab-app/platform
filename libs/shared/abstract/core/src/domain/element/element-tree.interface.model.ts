import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { INode } from '../builder'
import { IElement } from './element.model.interface'

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
  elementsList: Array<IElement>
  getPathFromRoot(element: INode): Array<INode>
  element(id: string): Maybe<IElement>
  addElements(elements: Array<IElement>): IElementTree
}

export interface IElementTreeService {
  elementTree: IElementTree
  setElementTree(t: IElementTree): void
  initTree(rootElementId: string): Promise<IElementTree>
  initTreeV2(rootElement: IElement, elements: Array<IElement>): IElementTree
}
