import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { ObjectMap } from 'mobx-keystone'
import type { IRuntimeElementModel } from './runtime-element'

export interface IRuntimeElementService {
  elements: ObjectMap<IRuntimeElementModel>
  elementsList: Array<IRuntimeElementModel>
  add(element: IElementModel): IRuntimeElementModel
}
