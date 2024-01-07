import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeModelRef } from '../runtime.model.interface'
import type { IRuntimeElementModel } from '../runtime-element'
import type { IRuntimeStoreModel } from '../runtime-store'

export interface IRuntimeContainerNodeDTO {
  containerNode: Ref<IComponentModel> | Ref<IPageModel>
  id: string
  parentRef?: IRuntimeModelRef
  runtimeRootElement: IRuntimeElementModel
  runtimeStore: IRuntimeStoreModel
}
