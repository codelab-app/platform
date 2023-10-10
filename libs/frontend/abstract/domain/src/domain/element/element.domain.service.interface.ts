import { IElementDTO } from '@codelab/shared/abstract/core'
import type { IElementModel } from './element.model.interface'
import { ObjectMap } from 'mobx-keystone'

export interface IMoveElementContext {
  element: IElementModel
  parentElement?: IElementModel
  prevSibling?: IElementModel
  nextSibling?: IElementModel
}

export interface IElementDomainService {
  elements: ObjectMap<IElementModel>

  add(elementDto: IElementDTO): IElementModel
  move(context: IMoveElementContext): void
}
