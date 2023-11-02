import type { IElementDTO } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap } from 'mobx-keystone'
import type { IElementModel } from './element.model.interface'

export interface IMoveElementContext {
  element: IElementModel
  nextSibling?: IElementModel
  parentElement?: IElementModel
  prevSibling?: IElementModel
}

export interface IElementDomainService {
  elements: ObjectMap<IElementModel>
  modifiedElements: Array<IElementModel>

  addTreeNode(elementDto: IElementDTO): IElementModel
  element(id: string): IElementModel
  hydrate(elementDto: IElementDTO): IElementModel
  logElementTreeState(): void
  maybeElement(id: Maybe<string>): Maybe<IElementModel>
  move(context: IMoveElementContext): void
  resetModifiedElements(): void
}
