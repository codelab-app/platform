import { Prop } from '@codelab/frontend/modules/element'
import { resourceRef } from '@codelab/frontend/modules/resource'
import {
  assertIsActionKind,
  IActionKind,
  IAnyAction,
  IProp,
  IResource,
  IResourceAction,
  IResourceActionConfig,
  IResourceActionDTO,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, prop, Ref } from 'mobx-keystone'
import { actionRef } from './action.ref'
import { createActionBase } from './action-base.model'

const hydrate = (action: IResourceActionDTO): IResourceAction => {
  assertIsActionKind(action.type, IActionKind.ResourceAction)

  return new ResourceAction({
    id: action.id,
    name: action.name,
    runOnInit: action.runOnInit,
    storeId: action.store.id,
    type: action.type,
    config: Prop.hydrate(action.config) as IProp<IResourceActionConfig>,
    resource: resourceRef(action.id),
    success: actionRef(action.success.id),
    error: actionRef(action.error.id),
  })
}

@model('@codelab/ResourceAction')
export class ResourceAction
  extends ExtendedModel(createActionBase(IActionKind.ResourceAction), {
    resource: prop<Ref<IResource>>(),
    config: prop<IProp<IResourceActionConfig>>(),
    success: prop<Ref<IAnyAction>>(),
    error: prop<Ref<IAnyAction>>(),
  })
  implements IResourceAction
{
  static hydrate = hydrate
}
