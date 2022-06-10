import { Ref } from 'mobx-keystone'
import { IAnyAction } from '../../action.interface'
import { IActionBase } from '../../action-base.interface'
import { IActionKind } from '../../action-kind.enum'

export interface IPipelineAction extends IActionBase {
  type: IActionKind.PipelineAction
  actions: Array<Ref<IAnyAction>>
  actionsSorted: Array<IActionBase>
}
