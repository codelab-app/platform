import { IActionBase } from '../../action-base.interface'
import { IActionKind } from '../../action-kind.enum'

export interface ICustomAction extends IActionBase {
  type: IActionKind.CustomAction
  code: string
}
