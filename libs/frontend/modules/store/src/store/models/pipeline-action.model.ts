import {
  ActionWithOrder,
  assertIsActionKind,
  IActionKind,
  IPipelineAction,
  IPipelineActionDTO,
} from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { createBaseAction, updateBaseAction } from './base-action.model'

const hydrate = (action: IPipelineActionDTO): IPipelineAction => {
  assertIsActionKind(action.type, IActionKind.PipelineAction)

  return new PipelineAction({
    id: action.id,
    name: action.name,
    runOnInit: action.runOnInit,
    storeId: action.store.id,
    type: action.type,
    actions: [],
    // actions: action.actionsConnection.edges.flatMap(
    //   (x) =>
    //     x.orders?.map((y) => ({
    //       order: Number(y) || 0,
    //       action: actionRef(x.node.id),
    //     })) || [],
    // ),
  })
}

@model('@codelab/PipelineAction')
export class PipelineAction
  extends ExtendedModel(createBaseAction(IActionKind.PipelineAction), {
    actions: prop<Array<ActionWithOrder>>(),
  })
  implements IPipelineAction
{
  @computed
  get actionsSorted() {
    return [...this.actions.values()]
      .sort(compareOrder)
      .map((a) => a.action.current)
  }

  static hydrate = hydrate

  @modelAction
  writeCache(data: IPipelineActionDTO) {
    updateBaseAction(this, data)

    this.actions = []
    // actionModel.actions = action.actionsConnection.edges.flatMap(
    //   (x) =>
    //     x.orders?.map((y) => ({
    //       order: Number(y) || 0,
    //       action: actionRef(x.node.id),
    //     })) || [],
    // )

    return this
  }
}

export const compareOrder = (a: ActionWithOrder, b: ActionWithOrder) =>
  (a.order ?? 0) - (b.order ?? 0)
