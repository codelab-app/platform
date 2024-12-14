import type { IActionKind, ICodeActionDto } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'

import type { IModel } from '../../shared'
import type { IStoreModel } from '../../store'

export interface ICodeActionModel
  extends IModel<ICodeActionDto, ICodeActionModel> {
  __typename: IActionKind.CodeAction
  code: string
  id: string
  name: string
  store: Ref<IStoreModel>
  type: IActionKind.CodeAction
}
