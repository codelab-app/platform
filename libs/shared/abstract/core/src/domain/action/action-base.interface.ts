import { IActionKind } from './action-kind.enum'

export interface IActionBase {
  id: IActionRef
  name: string
  runOnInit: boolean
  type: IActionKind
  storeId: string
}

export type IActionRef = string
