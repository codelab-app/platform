import type {
  ICodeAction,
  ICodeActionDTO,
} from '@codelab/frontend/abstract/core'
import { getRenderService, storeRef } from '@codelab/frontend/abstract/core'
import {
  CodeActionCreateInput,
  CodeActionDeleteInput,
  CodeActionUpdateInput,
} from '@codelab/shared/abstract/codegen'
import { IActionKind } from '@codelab/shared/abstract/core'
import { connectNodeId } from '@codelab/shared/domain/mapper'
import { computed } from 'mobx'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { v4 } from 'uuid'
import { getActionService } from '../action.service.context'
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
  @computed
  get actionService() {
    return getActionService(this)
  }

  @computed
  get renderService() {
    return getRenderService(this)
  }

  @modelAction
  clone(storeId: string) {
    return this.actionService.add<ICodeActionDTO>({
      __typename: IActionKind.CodeAction,
      code: this.code,
      id: v4(),
      name: this.name,
      store: { id: storeId },
    })
  }

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
