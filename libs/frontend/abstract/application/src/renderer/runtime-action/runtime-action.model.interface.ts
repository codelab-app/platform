import type { IActionModel } from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'

export interface IRuntimeActionModel {
  action: Ref<IActionModel>

  id: string

  runner(): (...args: Array<unknown>) => unknown
}
