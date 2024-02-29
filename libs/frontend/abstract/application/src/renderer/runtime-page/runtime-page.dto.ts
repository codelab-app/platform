import type { IPageModel } from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeElementModel } from '../runtime-element'
import type { IRuntimeStoreModel } from '../runtime-store'

export interface IRuntimePageDTO {
  childPage?: Ref<IPageModel>
  id?: string
  page: Ref<IPageModel>
  runtimeParent?: Ref<IRuntimeElementModel>
  runtimeStore: IRuntimeStoreModel
}
