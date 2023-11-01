import type {
  IActionModel,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import type { IRef } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeAction } from '../renderer'

export interface IRuntimeStore {
  runtimeActions: Array<IRuntimeAction>
  store: IStoreModel
  storeRef: Ref<IStoreModel>

  runtimeAction(action: IRef): IRuntimeAction
}
