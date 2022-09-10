import { Ref } from 'mobx-keystone'
import { ICacheService } from '../../../../service'
import { IResource } from '../../../resource'
import { IResourceActionConfig } from '../../action.dto.interface'
import { IAnyAction } from '../../action.interface'
import { IActionBase } from '../../action-base.interface'
import { IActionKind } from '../../action-kind.enum'
import { IResourceActionDTO } from './resource-action.dto.interface'

export interface IResourceAction
  extends IActionBase,
    ICacheService<IResourceActionDTO, IResourceAction> {
  type: IActionKind.ResourceAction
  resource: Ref<IResource>
  config: IResourceActionConfig
  successAction: Ref<IAnyAction>
  errorAction: Ref<IAnyAction>
  run: () => Promise<any>
}
