import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeStoreModel } from '../runtime-store'
import type { SubTree } from './runtime-container-node.model.interface'

export interface IRuntimeContainerNodeDTO {
  containerNode: Ref<IComponentModel> | Ref<IPageModel>
  id?: string
  runtimeStore: IRuntimeStoreModel
  subTrees: Array<SubTree>
}
