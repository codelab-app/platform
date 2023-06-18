import type { Ref } from 'mobx-keystone'
import type { IAction } from '../action'
import type { IPropData } from '../prop'

export interface IActionRunner {
  actionRef: Ref<IAction>
  props: IPropData

  runner(...args: Array<unknown>): void
}
