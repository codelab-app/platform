import type {
  CodeActionCreateInput,
  CodeActionDeleteInput,
  CodeActionUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IActionKind, ICodeActionDTO } from '@codelab/shared/abstract/core'
import type { ICacheService } from '../../../../service'
import type { IModel } from '../../../model.interface'
import type { IBaseAction } from '../../base-action.interface'

export interface ICodeActionModel
  extends IBaseAction,
    ICacheService<ICodeActionDTO, ICodeActionModel>,
    IModel<
      CodeActionCreateInput,
      CodeActionUpdateInput,
      CodeActionDeleteInput
    > {
  code: string
  type: IActionKind.CodeAction
}
