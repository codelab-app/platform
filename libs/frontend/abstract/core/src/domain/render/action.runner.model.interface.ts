import type { Ref } from 'mobx-keystone'
import type { IAction } from '../action'
import type { IElementModel } from '../element'

export interface IActionRunner {
  actionRef: Ref<IAction>
  elementRef: Ref<IElementModel>
  id: string

  runner(...args: Array<unknown>): void
}

export const getRunnerId = (storeId: string, actionId: string) =>
  `${storeId}${actionId}`
