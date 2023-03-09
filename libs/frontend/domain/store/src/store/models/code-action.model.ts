import type {
  ICodeAction,
  ICodeActionDTO,
} from '@codelab/frontend/abstract/core'
import { IProp } from '@codelab/frontend/abstract/core'
import {
  CodeActionCreateInput,
  CodeActionDeleteInput,
  CodeActionUpdateInput,
} from '@codelab/shared/abstract/codegen'
import { IActionKind } from '@codelab/shared/abstract/core'
import { connectNodeId } from '@codelab/shared/domain/mapper'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { createBaseAction } from './base-action.model'
import { storeRef } from './store.model'

@model('@codelab/CodeAction')
export class CodeAction
  extends ExtendedModel(createBaseAction(IActionKind.CodeAction), {
    code: prop<string>(),
  })
  implements ICodeAction
{
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
  writeCache({ name, store, type, code }: Partial<ICodeActionDTO>) {
    this.name = name ?? this.name
    this.store = store ? storeRef(store.id) : this.store
    this.code = code ?? this.code

    return this
  }

  @modelAction
  toCreateInput(): CodeActionCreateInput {
    return {
      code: this.code,
      id: this.id,
      name: this.name,
      store: connectNodeId(this.store.id),
    }
  }

  @modelAction
  toUpdateInput(): CodeActionUpdateInput {
    return {
      code: this.code,
      name: this.name,
    }
  }

  @modelAction
  toDeleteInput(): CodeActionDeleteInput {
    return {}
  }
}
