import type {
  IComponentModel,
  IElementModel,
} from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeContainerNodeModel } from '../runtime-container-node'
import type { IRuntimeElementModel } from '../runtime-element'

export interface IRuntimeElementPropDTO {
  element: Ref<IElementModel>
  runtimeElement: Ref<IRuntimeElementModel>
}

export interface IRuntimeComponentPropDTO {
  component: Ref<IComponentModel>
  runtimeContainerNode: Ref<IRuntimeContainerNodeModel>
}
