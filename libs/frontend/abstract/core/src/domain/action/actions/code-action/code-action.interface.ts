import { IActionKind } from '@codelab/shared/abstract/core'
import { ICacheService } from '../../../../service'
import { IActionBase } from '../../action-base.interface'
import { ICodeActionDTO } from './code-action.dto.interface'

export interface ICodeAction
  extends IActionBase,
    ICacheService<ICodeActionDTO, ICodeAction> {
  type: IActionKind.CodeAction
  code: string
}
