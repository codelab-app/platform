import { IActionKind } from './action-kind.enum'

export interface IActionBase {
  id: IActionRef
  name: string
  runOnInit: boolean
  type: IActionKind
  storeId: string

  // eslint-disable-next-line @typescript-eslint/ban-types
  getQueue(): Promise<Array<Function>>
}

export type IActionRef = string
