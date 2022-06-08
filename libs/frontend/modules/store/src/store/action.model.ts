import { Prop } from '@codelab/frontend/modules/element'
import { resourceRef } from '@codelab/frontend/modules/resource'
import {
  IAction,
  IActionDTO,
  IResource,
  IResourceActionConfig,
} from '@codelab/shared/abstract/core'
import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { detach, idProp, Model, model, prop, Ref, rootRef } from 'mobx-keystone'

@model('@codelab/Action')
export class Action
  extends Model({
    id: idProp,
    name: prop<string>(),
    body: prop<Nullable<string>>(),
    config: prop<Nullish<IResourceActionConfig>>(),
    resource: prop<Nullish<Ref<IResource>>>(),
    runOnInit: prop<boolean>(),
    storeId: prop<string>(),
  })
  implements IAction
{
  static hydrate(action: IActionDTO) {
    return new Action({
      body: action.body ?? null,
      name: action.name,
      id: action.id,
      config: Prop.hydrate(action.config) as IResourceActionConfig,
      resource: action.resource ? resourceRef(action.resource.id) : null,
      runOnInit: action.runOnInit,
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
