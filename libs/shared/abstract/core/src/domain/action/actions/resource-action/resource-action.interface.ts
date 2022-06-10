import { Ref } from 'mobx-keystone'
import { IProp } from '../../../prop'
import { IResource } from '../../../resource'
import { IResourceActionConfig } from '../../action.dto.interface'
import { IAnyAction } from '../../action.interface'
import { IActionBase } from '../../action-base.interface'
import { IActionKind } from '../../action-kind.enum'

export interface IResourceAction extends IActionBase {
  type: IActionKind.ResourceAction
  resource: Ref<IResource>
  config: IProp<IResourceActionConfig>
  success: Ref<IAnyAction>
  error: Ref<IAnyAction>
}
