import type { IActionModel } from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeStoreModel } from '../runtime-store'

export interface IRuntimeActionDTO {
  actionRef: Ref<IActionModel>
  runtimeStoreRef: Ref<IRuntimeStoreModel>
}
