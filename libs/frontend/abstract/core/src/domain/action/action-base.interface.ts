import type { IActionKind } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { IProp } from '../prop'
import type { IStore } from '../store'

export interface IActionBase {
  createRunner(state: IProp): (...args: Array<unknown>) => unknown
  id: IActionRef
  name: string
  store: Ref<IStore>

  type: IActionKind
}

export type IActionRef = string
