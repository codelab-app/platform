import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { IElement, IElementRef } from './element.model.interface'

export interface IElementTree {
  id: string
  _root: Nullable<Ref<IElement>>
  root: Maybe<IElement>
  elementsList: Array<IElement>
  getPathFromRoot(element: IElement): Array<IElement>
  element(id: string): Maybe<IElement>
  buildTree(elements: Array<IElement>): void

  /**
   * Modify it so it can build a tree from parameter
   */
  getTree(root: IElementRef): Promise<IElementTree>
  // elements: ObjectMap<IElement>
}
