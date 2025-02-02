import type { IActionModel } from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'

import type { IRuntimeStoreModel } from '../runtime-store'

export interface IRuntimeActionDto {
  action: Ref<IActionModel>
  runtimeStore: Ref<IRuntimeStoreModel>
}
