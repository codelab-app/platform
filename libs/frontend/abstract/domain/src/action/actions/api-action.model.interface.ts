import type { IActionKind, IApiActionDto } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'

import type { IPropModel } from '../../prop'
import type { IResourceModel } from '../../resource'
import type { IModel } from '../../shared'
import type { IStoreModel } from '../../store'
import type { IActionModel } from '../action.model.interface'

export interface IApiActionModel
  extends IModel<IApiActionDto, IApiActionModel> {
  __typename: IActionKind.ApiAction
  config: IPropModel
  errorAction?: Nullish<Ref<IActionModel>>
  id: string
  name: string
  resource: Ref<IResourceModel>
  store: Ref<IStoreModel>
  successAction?: Nullish<Ref<IActionModel>>
  type: IActionKind.ApiAction
}
