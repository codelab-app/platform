import type {
  IActionKind,
  ICodeAction,
  ICodeActionDto,
} from '@codelab/shared/abstract/core'
import type {
  CodeActionCreateInput,
  CodeActionDeleteInput,
  CodeActionUpdateInput,
} from '@codelab/shared/infra/gql'

import type { ICacheService, IModel } from '../../shared'
import type { IBaseAction } from '../base-action.interface'

export interface ICodeActionModel
  extends IBaseAction,
    ICacheService<ICodeActionDto, ICodeActionModel>,
    IModel<
      CodeActionCreateInput,
      CodeActionUpdateInput,
      CodeActionDeleteInput,
      ICodeAction
    > {
  code: string
  type: IActionKind.CodeAction
}
