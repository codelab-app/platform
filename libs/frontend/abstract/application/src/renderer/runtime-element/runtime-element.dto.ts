import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeContainerNodeModel } from '../runtime-container-node'
import type { IRuntimeElementPropModel } from '../runtime-prop'

export interface IRuntimeElementDTO {
  closestContainerNode: Ref<IRuntimeContainerNodeModel>
  element: Ref<IElementModel>
  id?: string
  runtimeProps: IRuntimeElementPropModel
  subTrees?: Array<Ref<IElementModel>>
}
