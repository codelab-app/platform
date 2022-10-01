import type {
  IAnyActionType,
  IAnyActionTypeDTO,
} from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/frontend/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import { createTypeBase } from './base-type.model'

const hydrate = ({ id, kind, name, owner }: IAnyActionTypeDTO): ActionType => {
  assertIsTypeKind(kind, ITypeKind.ActionType)

  return new ActionType({ id, kind, name, ownerId: owner.id })
}

@model('@codelab/ActionType')
export class ActionType
  extends ExtendedModel(createTypeBase(ITypeKind.ActionType), {})
  implements IAnyActionType
{
  public static hydrate = hydrate
}
