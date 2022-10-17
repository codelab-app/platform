import { IActionKind } from '@codelab/shared/abstract/core'
import { IProp } from '../prop'

export interface IActionBase {
  id: IActionRef
  name: string
  type: IActionKind
  storeId: string

  createRunner: (state: IProp) => (...args: Array<unknown>) => unknown
}

export type IActionRef = string
