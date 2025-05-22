import type { IPageModel } from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'

import type { IRuntimeElementModel } from '../runtime-element'
import type { IRuntimeStoreModel } from '../runtime-store'

export interface IRuntimePageDto {
  compositeKey: string
  page: Ref<IPageModel>
  runtimeRootElement: Ref<IRuntimeElementModel>
  runtimeStore: IRuntimeStoreModel
}
