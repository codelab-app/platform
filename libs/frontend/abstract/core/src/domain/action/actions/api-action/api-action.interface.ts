import type { IActionKind } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../../../service'
import type { IProp } from '../../../prop'
import type { IResource } from '../../../resource'
import type { IApiActionConfig } from '../../action.dto.interface'
import type { IAnyAction } from '../../action.interface'
import type { IActionBase } from '../../action-base.interface'
import type { IApiActionDTO } from './api-action.dto.interface'

export interface IApiAction extends IActionBase {
  type: IActionKind.ApiAction
  resource: Ref<IResource>
  config: Ref<IProp<IApiActionConfig>>
  successAction?: Nullish<Ref<IAnyAction>>
  errorAction?: Nullish<Ref<IAnyAction>>
}
