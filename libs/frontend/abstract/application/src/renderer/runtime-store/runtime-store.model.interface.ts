import type { IStoreModel } from '@codelab/frontend/abstract/domain'
import type { IPropData, IRef } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { IRuntimeActionModel } from '../runtime-action'

export interface IRuntimeStoreModel {
  id: string
  jsonString: string
  refs: IPropData
  runtimeActions: ObjectMap<IRuntimeActionModel>
  runtimeProviderSore?: IRuntimeStoreModel
  runtimeProviderStoreRef?: Ref<IRuntimeStoreModel>
  state: IPropData

  store: IStoreModel
  storeRef: Ref<IStoreModel>

  registerRef(key: string, node: HTMLElement): void
  runtimeAction(action: IRef): Maybe<IRuntimeActionModel>
}
