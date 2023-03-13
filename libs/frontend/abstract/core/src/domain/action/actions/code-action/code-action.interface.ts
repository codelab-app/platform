import type { IActionKind } from '@codelab/shared/abstract/core'
import type { ICacheService } from '../../../../service'
import type { IActionBase } from '../../action-base.interface'
import type { ICodeActionDTO } from './code-action.dto.interface'

export interface ICodeAction
  extends IActionBase,
    ICacheService<ICodeActionDTO, ICodeAction> {
  code: string
  type: IActionKind.CodeAction
}
