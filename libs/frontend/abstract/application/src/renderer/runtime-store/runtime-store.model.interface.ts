import type { IStoreModel } from '@codelab/frontend/abstract/domain'
import type { IPropData, IRef } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { AnyModel, ObjectMap, Ref } from 'mobx-keystone'
import type { IRuntimeActionModel } from '../runtime-action'

export interface IRuntimeStoreModel extends AnyModel {
  id: string
  jsonString: string
  refs: IPropData
  runtimeActions: ObjectMap<IRuntimeActionModel>
  runtimeActionsList: Array<IRuntimeActionModel>
  runtimeProviderStore?: Ref<IRuntimeStoreModel>
  state: IPropData

  store: Ref<IStoreModel>

  registerRef(key: string, node: HTMLElement): void
  runtimeAction(action: IRef): Maybe<IRuntimeActionModel>
}
