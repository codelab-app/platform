import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { IRuntimeElementModel, IRuntimeProp } from '../runtime-element'
import type { IRuntimeModel, IRuntimeModelRef } from '../runtime-model'
import type { IRuntimeStoreModel } from '../runtime-store'

export interface IRuntimeContainerNodeModel extends IRuntimeProp {
  containerNode: IComponentModel | IPageModel
  containerNodeRef: Ref<IComponentModel> | Ref<IPageModel>

  parent?: IRuntimeModel
  parentRef?: IRuntimeModelRef

  runtimeElements: ObjectMap<IRuntimeElementModel>
  runtimeStore: Ref<IRuntimeStoreModel>
}
