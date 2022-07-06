import {
  assertIsActionKind,
  IActionKind,
  IAnyAction,
  IPipelineAction,
  IPipelineActionDTO,
} from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { ExtendedModel, model, prop, Ref } from 'mobx-keystone'
import { actionRef } from './action.ref'
import { createActionBase } from './action-base.model'

const hydrate = (action: IPipelineActionDTO): IPipelineAction => {
  assertIsActionKind(action.type, IActionKind.PipelineAction)

  return new PipelineAction({
    id: action.id,
    name: action.name,
    runOnInit: action.runOnInit,
    storeId: action.store.id,
    type: action.type,
    actions: action.actions.map((a) => actionRef(a.id)),
  })
}

@model('@codelab/PipelineAction')
export class PipelineAction
  extends ExtendedModel(createActionBase(IActionKind.PipelineAction), {
    actions: prop<Array<Ref<IAnyAction>>>(),
  })
  implements IPipelineAction
{
  @computed
  get actionsSorted() {
    return [...this.actions.values()].map((a) => a.current)
  }

  static hydrate = hydrate

  run() {
    return Promise.resolve(this.actionsSorted.map((a) => a.run()))
  }
}
