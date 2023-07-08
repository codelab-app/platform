import type { Ref } from 'mobx-keystone'
import type { IAction } from '../action'
import type { IPropData } from '../prop'

export interface IActionRunner {
  actionRef: Ref<IAction>
  id: string
  props: IPropData

  runner(...args: Array<unknown>): void
}

export const getRunnerId = (storeId: string, actionId: string) =>
  `${storeId}${actionId}`
