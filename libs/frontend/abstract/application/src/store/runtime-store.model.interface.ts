import type {
  IActionModel,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import type { IPropData, IRef } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeAction, IRuntimeElementModel } from '../renderer'

export interface IRuntimeStore {
  jsonString: string
  refs: IPropData
  runtimeActions: Array<IRuntimeAction>
  runtimeElement: IRuntimeElementModel
  runtimeElementRef: Ref<IRuntimeElementModel>
  store: IStoreModel
  storeRef: Ref<IStoreModel>

  registerRef(key: string, node: HTMLElement): void
  runtimeAction(action: IRef): IRuntimeAction
}
