import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { ObjectMap, Ref } from 'mobx-keystone'
import { IElement } from './element.model.interface'

export interface IElementTree {
  id: string
  _root: Nullable<Ref<IElement>>
  root: Maybe<IElement>
  elementsList: Array<IElement>
  getPathFromRoot(element: IElement): Array<IElement>
  element(id: string): Maybe<IElement>
  buildTree(elements: Array<IElement>): void
  elements: ObjectMap<IElement>
}
