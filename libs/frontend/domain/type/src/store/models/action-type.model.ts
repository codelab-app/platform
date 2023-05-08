import type { IActionType } from '@codelab/frontend/abstract/core'
import type { IActionTypeDTO } from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import { createBaseType } from './base-type.model'

const create = ({ id, kind, name, owner }: IActionTypeDTO) => {
  assertIsTypeKind(kind, ITypeKind.ActionType)

  return new ActionType({ id, kind, name, owner })
}

@model('@codelab/ActionType')
export class ActionType
  extends ExtendedModel(createBaseType(ITypeKind.ActionType), {})
  implements IActionType
{
  static create = create
}
