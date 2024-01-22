import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeElementModel } from '../runtime-element'
import type { IRuntimeComponentPropModel } from '../runtime-prop'
import type { IRuntimeStoreModel } from '../runtime-store'
import type { SubTree } from './runtime-container-node.model.interface'

export interface IRuntimeContainerNodeDTO {
  childMapperIndex?: number
  componentRuntimeProp?: IRuntimeComponentPropModel
  containerNode: Ref<IComponentModel> | Ref<IPageModel>
  id?: string
  runtimeParent?: Ref<IRuntimeElementModel>
  runtimeStore: IRuntimeStoreModel
  subTrees?: Array<SubTree>
}
