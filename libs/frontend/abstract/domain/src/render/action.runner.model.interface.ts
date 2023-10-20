import type { Ref } from 'mobx-keystone'
import type { IActionModel } from '../action'
import type { IElementModel } from '../element'

export interface IActionRunner {
  actionRef: Ref<IActionModel>
  elementRef: Ref<IElementModel>
  id: string

  runner(...args: Array<unknown>): void
}

export const getRunnerId = (storeId: string, actionId: string) =>
  `${storeId}${actionId}`
