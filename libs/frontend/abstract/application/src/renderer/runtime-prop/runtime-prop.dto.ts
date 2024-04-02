import type { Ref } from 'mobx-keystone'
import type { IRuntimeComponentModel } from '../runtime-component'
import type { IRuntimeElementModel } from '../runtime-element'

export interface IRuntimeElementPropDTO {
  runtimeElement: Ref<IRuntimeElementModel>
}

export interface IRuntimeComponentPropDTO {
  runtimeComponent: Ref<IRuntimeComponentModel>
}
