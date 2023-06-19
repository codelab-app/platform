import type {
  ICodeAction,
  ICodeActionDTO,
} from '@codelab/frontend/abstract/core'
import { storeRef } from '@codelab/frontend/abstract/core'
import {
  CodeActionCreateInput,
  CodeActionDeleteInput,
  CodeActionUpdateInput,
} from '@codelab/shared/abstract/codegen'
import { IActionKind } from '@codelab/shared/abstract/core'
import { connectNodeId } from '@codelab/shared/domain/mapper'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { createBaseAction } from './base-action.model'

const create = ({ code, id, name, store }: ICodeActionDTO) =>
  new CodeAction({
    code,
    id,
    name,
    store: storeRef(store.id),
    type: IActionKind.CodeAction,
  })

@model('@codelab/CodeAction')
export class CodeAction
  extends ExtendedModel(createBaseAction(IActionKind.CodeAction), {
    code: prop<string>(),
  })
  implements ICodeAction
{
  @modelAction
  writeCache({ code, name }: Partial<ICodeActionDTO>) {
    this.name = name ?? this.name
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
      type: IActionKind.CodeAction,
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

  static create = create
}
