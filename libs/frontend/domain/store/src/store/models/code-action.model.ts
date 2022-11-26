import {
  ICodeAction,
  ICodeActionDTO,
  IProp,
} from '@codelab/frontend/abstract/core'
import { assertIsActionKind, IActionKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { createBaseAction, updateBaseAction } from './base-action.model'
import { storeRef } from './store.model'

const hydrate = (action: ICodeActionDTO): ICodeAction => {
  assertIsActionKind(action.type, IActionKind.CodeAction)

  return new CodeAction({
    id: action.id,
    name: action.name,
    code: action.code,
    store: storeRef(action.store.id),
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
  createRunner(state: IProp) {
    try {
      // eslint-disable-next-line no-eval
      return eval(`(${this.code})`).bind(state)
    } catch (error) {
      console.log(error)

      return () => undefined
    }
  }

  @modelAction
  writeCache = (data: ICodeActionDTO) => {
    updateBaseAction(this, data)

    this.code = data.code

    return this
  }
}
