import type {
  ApiActionCreateInput,
  ApiActionDeleteInput,
  ApiActionUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IActionKind, IApiActionDTO } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../../../service'
import type { IModel } from '../../../model.interface'
import type { IPropModel } from '../../../prop'
import type { IResourceModel } from '../../../resource'
import type { IActionModel } from '../../action.model.interface'
import type { IBaseAction } from '../../base-action.interface'

export interface IApiActionModel
  extends IBaseAction,
    ICacheService<IApiActionDTO, IApiActionModel>,
    IModel<ApiActionCreateInput, ApiActionUpdateInput, ApiActionDeleteInput> {
  config: Ref<IPropModel>
  errorAction?: Nullish<Ref<IActionModel>>
  resource: Ref<IResourceModel>
  successAction?: Nullish<Ref<IActionModel>>
  type: IActionKind.ApiAction
}
