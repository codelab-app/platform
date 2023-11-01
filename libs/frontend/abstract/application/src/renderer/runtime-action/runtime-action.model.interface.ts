import type {
  IActionModel,
  IElementModel,
} from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeStoreModel } from '../runtime-store'

export interface IRuntimeActionModel {
  actionRef: Ref<IActionModel>
  element: IElementModel
  // elementRef: Ref<IElementModel>
  fromProvider: boolean
  id: string
  runtimeStoreRef: Ref<IRuntimeStoreModel>

  runner(...args: Array<unknown>): void
}
