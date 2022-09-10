import { Ref } from 'mobx-keystone'
import { ICacheService } from '../../../../service'
import { IAnyAction } from '../../action.interface'
import { IActionBase } from '../../action-base.interface'
import { IActionKind } from '../../action-kind.enum'
import { IPipelineActionDTO } from './pipeline-action.dto.interface'

export interface ActionWithOrder {
  order: number
  action: Ref<IAnyAction>
}

export interface IPipelineAction
  extends IActionBase,
    ICacheService<IPipelineActionDTO, IPipelineAction> {
  type: IActionKind.PipelineAction
  actions: Array<ActionWithOrder>
  actionsSorted: Array<IAnyAction>
}
