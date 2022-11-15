import { IActionKind } from '@codelab/shared/abstract/core'
import { Ref } from 'mobx-keystone'
import { IProp } from '../prop'
import { IStore } from '../store'

export interface IActionBase {
  id: IActionRef
  name: string
  type: IActionKind
  store: Ref<IStore>

  createRunner: (state: IProp) => (...args: Array<unknown>) => unknown
}

export type IActionRef = string
