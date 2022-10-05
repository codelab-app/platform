import { IActionKind } from '@codelab/shared/abstract/core'
import { IPropData } from '../prop'

export interface IActionBase {
  id: IActionRef
  name: string
  type: IActionKind
  storeId: string

  createRunner: (
    ctx: IPropData,
    updateState: (state: IPropData) => void,
  ) => (...args: Array<unknown>) => unknown
}

export type IActionRef = string
