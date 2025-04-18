import type { IPageModel } from '@codelab/frontend-abstract-domain'
import type { Ref } from 'mobx-keystone'

import type { IRuntimeStoreModel } from '../runtime-store'
import type { IRuntimePageModel } from './runtime-page.model.interface'

export interface IRuntimePageDto {
  childPage?: Ref<IRuntimePageModel>
  compositeKey: string
  page: Ref<IPageModel>
  runtimeStore: IRuntimeStoreModel
}
