import {
  assertIsActionKind,
  IActionKind,
  ICodeAction,
  ICodeActionDTO,
  IPropData,
} from '@codelab/frontend/abstract/core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { createBaseAction, updateBaseAction } from './base-action.model'

const hydrate = (action: ICodeActionDTO): ICodeAction => {
  assertIsActionKind(action.type, IActionKind.CodeAction)

  return new CodeAction({
    id: action.id,
    name: action.name,
    code: action.code,
    storeId: action.store.id,
    type: action.type,
  })
}

@model('@codelab/CodeAction')
export class CodeAction
  extends ExtendedModel(createBaseAction(IActionKind.CodeAction), {
    code: prop<string>(),
  })
  implements ICodeAction
{
  static hydrate = hydrate

  @modelAction
  createRunner(context: IPropData) {
    // eslint-disable-next-line no-eval
    return eval(`(${this.code})`).bind(context)
  }

  @modelAction
  writeCache = (data: ICodeActionDTO) => {
    updateBaseAction(this, data)

    this.code = data.code

    return this
  }
}
