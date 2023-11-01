import type { IStoreModel } from '@codelab/frontend/abstract/domain'
import type { IPropData, IRef } from '@codelab/shared/abstract/core'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { IRuntimeActionModel } from '../runtime-action'

export interface IRuntimeStoreModel {
  jsonString: string
  refs: IPropData
  runtimeActions: ObjectMap<Ref<IRuntimeActionModel>>
  store: IStoreModel
  storeRef: Ref<IStoreModel>

  registerRef(key: string, node: HTMLElement): void
  runtimeAction(action: IRef): IRuntimeActionModel
}
