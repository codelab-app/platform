import {
  assertIsActionKind,
  IActionKind,
  ICustomAction,
  ICustomActionDTO,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import { createQueue } from '../createQueue'
import { createActionBase } from './action-base.model'

const hydrate = (action: ICustomActionDTO): ICustomAction => {
  assertIsActionKind(action.type, IActionKind.CustomAction)

  return new CustomAction({
    id: action.id,
    name: action.name,
    code: action.code,
    runOnInit: action.runOnInit,
    storeId: action.store.id,
    type: action.type,
  })
}

@model('@codelab/CustomAction')
export class CustomAction
  extends ExtendedModel(createActionBase(IActionKind.CustomAction), {
    code: prop<string>(),
  })
  implements ICustomAction
{
  static hydrate = hydrate

  getQueue() {
    return Promise.resolve(createQueue(this.code))
  }
}
