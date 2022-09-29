import { IPropData } from '../prop'
import { IActionKind } from './action-kind.enum'

export interface IActionBase {
  id: IActionRef
  name: string
  type: IActionKind
  storeId: string

  createRunner: (
    ctx: IPropData,
    updateState: (state: IPropData) => void,
  ) => (...args: Array<any>) => any
}

export type IActionRef = string
