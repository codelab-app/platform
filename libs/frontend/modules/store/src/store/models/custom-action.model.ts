import {
  assertIsActionKind,
  IActionKind,
  ICustomAction,
  ICustomActionDTO,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, prop } from 'mobx-keystone'
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
    // eslint-disable-next-line @typescript-eslint/ban-types
    let functionQueue: Array<Function> = []

    try {
      functionQueue = [new Function(this.code)]
    } catch (error) {
      console.log(error)
    }

    // eslint-disable-next-line  no-new-func
    return Promise.resolve(functionQueue)
  }
}
