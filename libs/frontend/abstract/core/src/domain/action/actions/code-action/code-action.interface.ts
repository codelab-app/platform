import type {
  CodeActionCreateInput,
  CodeActionDeleteInput,
  CodeActionUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IActionKind } from '@codelab/shared/abstract/core'
import type { ICacheService } from '../../../../service'
import type { IBaseAction } from '../../action-base.interface'
import type { ICodeActionDTO } from './code-action.dto.interface'

export interface ICodeAction
  extends IBaseAction,
    ICacheService<ICodeActionDTO, ICodeAction> {
  type: IActionKind.CodeAction
  code: string

  toCreateInput(): CodeActionCreateInput
  toUpdateInput(): CodeActionUpdateInput
  toDeleteInput(): CodeActionDeleteInput
}
