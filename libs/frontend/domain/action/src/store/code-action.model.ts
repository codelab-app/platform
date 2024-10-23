import type { ICodeActionModel } from '@codelab/frontend/abstract/domain'
import type { ICodeActionDto } from '@codelab/shared/abstract/core'

import { storeRef } from '@codelab/frontend/abstract/domain'
import { IActionKind } from '@codelab/shared/abstract/core'
import { connectNodeId } from '@codelab/shared/domain-old'
import {
  CodeActionCreateInput,
  CodeActionDeleteInput,
  CodeActionUpdateInput,
} from '@codelab/shared/infra/gql'
import { computed } from 'mobx'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'

import { createBaseAction } from './base-action.model'

const create = ({ code, id, name, store }: ICodeActionDto) =>
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
  implements ICodeActionModel
{
  static create = create

  @computed
  get toJson() {
    return {
      __typename: IActionKind.CodeAction as const,
      code: this.code,
      id: this.id,
      name: this.name,
      store: this.store,
    }
  }

  @modelAction
  writeCache({ code, name }: Partial<ICodeActionDto>) {
    this.name = name ?? this.name
    this.code = code ?? this.code

    return this
  }
}
