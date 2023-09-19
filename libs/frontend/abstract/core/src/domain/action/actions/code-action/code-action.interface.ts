import type {
  CodeActionCreateInput,
  CodeActionDeleteInput,
  CodeActionUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IActionKind, ICodeActionDTO } from '@codelab/shared/abstract/core'
import type { ICacheService } from '../../../../service'
import type { IBaseAction } from '../../base-action.interface'

export interface ICodeAction
  extends IBaseAction,
    ICacheService<ICodeActionDTO, ICodeAction> {
  code: string
  type: IActionKind.CodeAction

  toCreateInput(): CodeActionCreateInput
  toDeleteInput(): CodeActionDeleteInput
  toUpdateInput(): CodeActionUpdateInput
}
