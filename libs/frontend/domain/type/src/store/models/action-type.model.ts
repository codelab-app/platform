import type {
  IActionTypeDTO,
  IAnyActionType,
} from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { createBaseType } from './base-type.model'

const create = ({ id, kind, name, owner }: IActionTypeDTO) => {
  assertIsTypeKind(kind, ITypeKind.ActionType)

  return new ActionType({ id, kind, name, owner })
}

@model('@codelab/ActionType')
export class ActionType
  extends ExtendedModel(createBaseType(ITypeKind.ActionType), {})
  implements IAnyActionType
{
  static create = create

  @modelAction
  writeCache({ id }: Partial<IActionTypeDTO>) {
    return this
  }
}
