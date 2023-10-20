import type {
  ApiActionCreateInput,
  ApiActionDeleteInput,
  ApiActionUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type {
  IActionKind,
  IApiActionDTO,
  IProp,
} from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { IPropModel } from '../../../prop'
import type { IResourceModel } from '../../../resource'
import type { ICacheService } from '../../../shared'
import type { IModel } from '../../../shared/models/model.interface'
import type { IActionModel } from '../../action.model.interface'
import type { IBaseAction } from '../../base-action.interface'

export interface IApiActionModel
  extends IBaseAction,
    ICacheService<IApiActionDTO, IApiActionModel>,
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

export interface IApiAction {
  config: IProp
}
