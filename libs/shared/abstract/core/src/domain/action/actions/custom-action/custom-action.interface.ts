import { ICacheService } from '../../../../service'
import { IActionBase } from '../../action-base.interface'
import { IActionKind } from '../../action-kind.enum'
import { ICodeActionDTO } from './custom-action.dto.interface'

export interface ICodeAction
  extends IActionBase,
    ICacheService<ICodeActionDTO, ICodeAction> {
  type: IActionKind.CodeAction
  code: string
}
