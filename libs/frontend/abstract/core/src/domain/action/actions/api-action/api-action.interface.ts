import { IActionKind } from '@codelab/shared/abstract/core'
import { Ref } from 'mobx-keystone'
import { ICacheService } from '../../../../service'
import { IResource } from '../../../resource'
import { IApiActionConfig } from '../../action.dto.interface'
import { IAnyAction } from '../../action.interface'
import { IActionBase } from '../../action-base.interface'
import { IApiActionDTO } from './api-action.dto.interface'

export interface IApiAction
  extends IActionBase,
    ICacheService<IApiActionDTO, IApiAction> {
  type: IActionKind.ApiAction
  resource: Ref<IResource>
  config: IApiActionConfig
  successAction: Ref<IAnyAction>
  errorAction: Ref<IAnyAction>
}
