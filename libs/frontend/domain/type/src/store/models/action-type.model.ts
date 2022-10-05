import type {
  IAnyActionType,
  IAnyActionTypeDTO,
} from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import { createBaseType } from './base-type.model'

const hydrate = ({ id, kind, name, owner }: IAnyActionTypeDTO) => {
  assertIsTypeKind(kind, ITypeKind.ActionType)

  return new ActionType({ id, kind, name, ownerId: owner.id })
}

@model('@codelab/ActionType')
export class ActionType
  extends ExtendedModel(createBaseType(ITypeKind.ActionType), {})
  implements IAnyActionType
{
  public static hydrate = hydrate
}
