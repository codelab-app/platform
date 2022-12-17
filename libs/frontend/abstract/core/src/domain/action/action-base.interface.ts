import type { IActionKind } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { IProp } from '../prop'
import type { IStore } from '../store'

export interface IActionBase {
  id: IActionRef
  name: string
  type: IActionKind
  store: Ref<IStore>

  createRunner: (state: IProp) => (...args: Array<unknown>) => unknown
}

export type IActionRef = string
