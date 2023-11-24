import type { IStoreModel } from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeStoreModel } from './runtime-store.model.interface'

export interface IRuntimeStoreDTO {
  id: string
  runtimeProviderStore?: Ref<IRuntimeStoreModel>
  store: Ref<IStoreModel>
}
