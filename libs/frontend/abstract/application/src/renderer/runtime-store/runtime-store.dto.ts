import type { IStoreModel } from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeActionModel } from '../runtime-action'
import type { IRuntimeStoreModel } from './runtime-store.model.interface'

export interface IRuntimeStoreDTO {
  id: string
  runtimeActions: Array<IRuntimeActionModel>
  runtimeProviderStoreRef?: Ref<IRuntimeStoreModel>
  storeRef: Ref<IStoreModel>
}
