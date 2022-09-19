import {
  assertIsActionKind,
  IActionKind,
  ICustomAction,
  ICustomActionDTO,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { createBaseAction, updateBaseAction } from './base-action.model'

const hydrate = (action: ICustomActionDTO): ICustomAction => {
  assertIsActionKind(action.type, IActionKind.CustomAction)

  return new CustomAction({
    id: action.id,
    name: action.name,
    code: action.code,
    storeId: action.store.id,
    type: action.type,
  })
}

@model('@codelab/CustomAction')
export class CustomAction
  extends ExtendedModel(createBaseAction(IActionKind.CustomAction), {
    code: prop<string>(),
  })
  implements ICustomAction
{
  static hydrate = hydrate

  @modelAction
  writeCache = (data: ICustomActionDTO) => {
    updateBaseAction(this, data)

    this.code = data.code

    return this
  }
}
