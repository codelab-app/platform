import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeModelRef } from '../runtime.model.interface'
import type { IRuntimeStoreModel } from '../runtime-store'

export interface IRuntimeContainerNodeDTO {
  containerNodeRef: Ref<IComponentModel> | Ref<IPageModel>
  parentRef?: IRuntimeModelRef
  runtimeStore: IRuntimeStoreModel
}
