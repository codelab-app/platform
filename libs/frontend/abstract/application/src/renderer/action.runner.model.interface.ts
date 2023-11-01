import type {
  IActionModel,
  IElementModel,
  IPageNode,
} from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeStore } from '../store/runtime-store.model.interface'

export interface IRuntimeAction {
  actionRef: Ref<IActionModel>
  element: IElementModel
  // elementRef: Ref<IElementModel>
  fromProvider: boolean
  id: string
  runtimeStoreRef: Ref<IRuntimeStore>

  runner(...args: Array<unknown>): void
}
