import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeContainerNodeModel } from '../runtime-container-node'
import type { IRuntimeElementPropModel } from '../runtime-prop'
import type { IRuntimeElementModel } from './runtime-element.model.interface'

export interface IRuntimeElementDTO {
  children: Array<Ref<IRuntimeContainerNodeModel> | Ref<IRuntimeElementModel>>
  closestContainerNode: Ref<IRuntimeContainerNodeModel>
  element: Ref<IElementModel>
  id?: string
  runtimeProps: IRuntimeElementPropModel
}
