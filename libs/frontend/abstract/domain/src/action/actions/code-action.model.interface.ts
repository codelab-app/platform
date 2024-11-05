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
import type { Ref } from 'mobx-keystone'

import type { IModel } from '../../shared'
import type { IStoreModel } from '../../store'
import type { IBaseAction } from '../base-action.interface'

export interface ICodeActionModel
  extends IModel<ICodeAction, ICodeActionModel> {
  __typename: IActionKind.CodeAction
  code: string
  id: string
  name: string
  store: Ref<IStoreModel>
  type: IActionKind.CodeAction
}
