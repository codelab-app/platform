import type { Ref } from 'mobx-keystone'
import type { IAction } from '../action'
import type { IElement } from '../element'

export interface IActionRunner {
  actionRef: Ref<IAction>
  elementRef: Ref<IElement>
  id: string

  runner(...args: Array<unknown>): void
}

export const getRunnerId = (storeId: string, actionId: string) =>
  `${storeId}${actionId}`
