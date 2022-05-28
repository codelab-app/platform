import { Prop } from '@codelab/frontend/modules/element'
import { resourceRef } from '@codelab/frontend/modules/resource'
import {
  IAction,
  IActionConfig,
  IActionDTO,
  IResource,
} from '@codelab/shared/abstract/core'
import { detach, idProp, Model, model, prop, Ref, rootRef } from 'mobx-keystone'

@model('@codelab/Action')
export class Action
  extends Model({
    id: idProp,
    name: prop<string>(),
    body: prop<string>(),
    config: prop<IActionConfig>(),
    resource: prop<Ref<IResource>>(),
    runOnInit: prop<boolean>(),
  })
  implements IAction
{
  static hydrate(action: IActionDTO) {
    return new Action({
      body: action.body,
      name: action.name,
      id: action.id,
      config: Prop.hydrate(action.config),
      resource: action.resource ? resourceRef(action.resource.id) : null,
      runOnInit: action.runOnInit,
    })
  }
}

export const actionRef = rootRef<Action>('@codelab/ActionRef', {
  onResolvedValueChange(ref, newAction, oldAction) {
    if (oldAction && !newAction) {
      detach(ref)
    }
  },
})
