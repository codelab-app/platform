import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap } from 'mobx-keystone'
import type { IRuntimeModel } from './runtime.model.interface'
import type { IRuntimeElementModel } from './runtime-element'

export interface IRuntimeElementService {
  elements: ObjectMap<IRuntimeElementModel>
  elementsList: Array<IRuntimeElementModel>
  add(
    element: IElementModel,
    parent: IRuntimeModel,
    propKey?: string,
  ): IRuntimeElementModel
  element(compositeKey: string): Maybe<IRuntimeElementModel>
}
