import type { IElementDto } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap } from 'mobx-keystone'

import type { IHydrateable } from '../shared'
import type { IElementModel } from './element.model.interface'

export interface IMoveElementContext {
  element: IElementModel
  nextSibling?: IElementModel
  parentElement?: IElementModel
  prevSibling?: IElementModel
}

export interface IElementDomainService
  extends IHydrateable<IElementDto, IElementModel> {
  elements: ObjectMap<IElementModel>
  modifiedElements: Array<IElementModel>
  addTreeNode(elementDto: IElementDto): IElementModel
  element(id: string): IElementModel
  logElementTreeState(): void
  maybeElement(id: Maybe<string>): Maybe<IElementModel>
  move(context: IMoveElementContext): void
  resetModifiedElements(): void
}
