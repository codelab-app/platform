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
    const values = state.values

    try {
      return (...args: Array<unknown>) => {
        // eslint-disable-next-line no-eval
        eval(`(${this.code})`).bind(values)(...args)
        // alter mobx with new state
        state.setMany(values)
      }
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
