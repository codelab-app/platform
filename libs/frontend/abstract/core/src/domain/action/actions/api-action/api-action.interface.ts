import type {
  ApiActionCreateInput,
  ApiActionDeleteInput,
  ApiActionUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IActionKind } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../../../service'
import type { IProp } from '../../../prop'
import type { IResource } from '../../../resource'
import type { IAction } from '../../action.interface'
import type { IBaseAction } from '../../base-action.interface'
import type { IApiActionDTO } from './api-action.dto.interface'

export interface IApiAction
  extends IBaseAction,
    ICacheService<IApiActionDTO, IApiAction> {
  config: Ref<IProp>
  errorAction?: Nullish<Ref<IAction>>
  resource: Ref<IResource>
  successAction?: Nullish<Ref<IAction>>
  type: IActionKind.ApiAction

  toCreateInput(): ApiActionCreateInput
  toDeleteInput(): ApiActionDeleteInput
  toUpdateInput(): ApiActionUpdateInput
}
