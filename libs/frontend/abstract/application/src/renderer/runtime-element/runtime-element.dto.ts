import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeComponentModel } from '../runtime-component'
import type { IRuntimePageModel } from '../runtime-page'
import type { IRuntimeElementPropModel } from '../runtime-prop'

export interface IRuntimeElementDTO {
  closestContainerNode: Ref<IRuntimeComponentModel> | Ref<IRuntimePageModel>
  compositeKey: string
  element: Ref<IElementModel>
  propKey?: string
  runtimeProps: IRuntimeElementPropModel
}
