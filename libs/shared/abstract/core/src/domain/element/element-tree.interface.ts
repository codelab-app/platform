import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { IElement } from './element.interface'

export interface IElementTree {
  id: string
  _root: Nullable<Ref<IElement>>
  root: Maybe<IElement>
  elementsList: Array<IElement>
  getPathFromRoot(element: IElement): Array<IElement>
  element(id: string): Maybe<IElement>
}
