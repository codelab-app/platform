import type {
  IActionModel,
  IElementModel,
  IPageNode,
} from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeStore } from '../store/runtime-store.model.interface'

export interface IRuntimeAction {
  actionRef: Ref<IActionModel>
  fromProvider: boolean
  // elementRef: Ref<IElementModel>
  id: string
  runtimeStore: Ref<IRuntimeStore>

  runner(node: IPageNode): (...args: Array<unknown>) => void
}

export const getRunnerId = (storeId: string, actionId: string) =>
  `${storeId}${actionId}`
