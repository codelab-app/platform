import { IAction, IActionDTO } from '@codelab/shared/abstract/core'
import { detach, idProp, Model, model, prop, rootRef } from 'mobx-keystone'

@model('@codelab/Action')
export class Action
  extends Model({
    id: idProp,
    name: prop<string>(),
    body: prop<string>(),
    storeId: prop<string>(),
  })
  implements IAction
{
  static hydrate(action: IActionDTO) {
    return new Action({
      body: action.body,
      name: action.name,
      id: action.id,
      storeId: action.store.id,
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
