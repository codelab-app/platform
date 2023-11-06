import type {
  IComponentModel,
  IElementModel,
} from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeContainerNodeModel } from '../runtime-container-node'
import type { IRuntimeElementModel } from '../runtime-element'

export interface IRuntimeElementPropDTO {
  elementRef: Ref<IElementModel>
  runtimeElementRef: Ref<IRuntimeElementModel>
}

export interface IRuntimeComponentPropDTO {
  componentRef: Ref<IComponentModel>
  runtimeContainerNodeRef: Ref<IRuntimeContainerNodeModel>
}
