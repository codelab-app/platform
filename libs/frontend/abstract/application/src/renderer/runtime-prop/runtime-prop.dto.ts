import type { Ref } from 'mobx-keystone'

import type { IRuntimeComponentModel } from '../runtime-component'
import type { IRuntimeElementModel } from '../runtime-element'

export interface IRuntimeElementPropDto {
  runtimeElement: Ref<IRuntimeElementModel>
}

export interface IRuntimeComponentPropDto {
  runtimeComponent: Ref<IRuntimeComponentModel>
}
