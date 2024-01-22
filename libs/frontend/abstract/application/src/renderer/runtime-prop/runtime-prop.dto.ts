import type { Ref } from 'mobx-keystone'
import type { IRuntimeContainerNodeModel } from '../runtime-container-node'
import type { IRuntimeElementModel } from '../runtime-element'

export interface IRuntimeElementPropDTO {
  runtimeElement: Ref<IRuntimeElementModel>
}

export interface IRuntimeComponentPropDTO {
  runtimeComponent: Ref<IRuntimeContainerNodeModel>
}
