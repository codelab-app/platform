import type {
  CodeActionCreateInput,
  CodeActionDeleteInput,
  CodeActionUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type {
  IActionKind,
  ICodeAction,
  ICodeActionDTO,
} from '@codelab/shared/abstract/core'
import type { ICacheService, IModel } from '../../shared'
import type { IBaseAction } from '../base-action.interface'

export interface ICodeActionModel
  extends IBaseAction,
    ICacheService<ICodeActionDTO, ICodeActionModel>,
    IModel<
      CodeActionCreateInput,
      CodeActionUpdateInput,
      CodeActionDeleteInput,
      ICodeAction
    > {
  code: string
  type: IActionKind.CodeAction
}
