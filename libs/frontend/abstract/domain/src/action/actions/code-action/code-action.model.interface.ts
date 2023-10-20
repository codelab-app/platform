import type {
  CodeActionCreateInput,
  CodeActionDeleteInput,
  CodeActionUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IActionKind, ICodeActionDTO } from '@codelab/shared/abstract/core'
import type { ICacheService } from '../../../shared'
import type { IModel } from '../../../shared/models/model.interface'
import type { IBaseAction } from '../../base-action.interface'

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

export interface ICodeAction {
  id: string
}
