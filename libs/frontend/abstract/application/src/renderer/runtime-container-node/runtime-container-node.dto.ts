import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeElementModel } from '../runtime-element'
import type { IRuntimeComponentPropModel } from '../runtime-prop'
import type { IRuntimeStoreModel } from '../runtime-store'
import type {
  IRuntimeContainerNodeModel,
  SubTree,
} from './runtime-container-node.model.interface'

export interface IRuntimeContainerNodeDTO {
  childMapperIndex?: number
  closestContainerNode: Ref<IRuntimeContainerNodeModel>
  componentRuntimeProp?: IRuntimeComponentPropModel
  containerNode: Ref<IComponentModel> | Ref<IPageModel>
  id?: string
  isTypedProp?: boolean
  runtimeParent?: Ref<IRuntimeElementModel>
  runtimeStore: IRuntimeStoreModel
  subTrees?: Array<SubTree>
}
