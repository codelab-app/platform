import type {
  IActionModel,
  IElementModel,
  IPageNode,
} from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeStore } from '../store/runtime-store.model.interface'

export interface IRuntimeAction {
  actionRef: Ref<IActionModel>
  elementRef: Ref<IElementModel>
  fromProvider: boolean
  id: string

  runner(node: IPageNode): (...args: Array<unknown>) => void
}
