import type {
  IActionKind,
  IApiAction,
  IApiActionDto,
} from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import type {
  ApiActionCreateInput,
  ApiActionDeleteInput,
  ApiActionUpdateInput,
} from '@codelab/shared/infra/gql'
import type { Ref } from 'mobx-keystone'

import type { IPropModel } from '../../prop'
import type { IResourceModel } from '../../resource'
import type { ICacheService, IModel } from '../../shared'
import type { IActionModel } from '../action.model.interface'
import type { IBaseAction } from '../base-action.interface'

export interface IApiActionModel
  extends IBaseAction,
    ICacheService<IApiActionDto, IApiActionModel>,
    IModel<
      ApiActionCreateInput,
      ApiActionUpdateInput,
      ApiActionDeleteInput,
      IApiAction
    > {
  config: IPropModel
  errorAction?: Nullish<Ref<IActionModel>>
  resource: Ref<IResourceModel>
  successAction?: Nullish<Ref<IActionModel>>
  type: IActionKind.ApiAction
}
