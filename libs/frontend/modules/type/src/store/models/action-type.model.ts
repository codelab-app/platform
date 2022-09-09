import type {
  IAnyActionType,
  IAnyActionTypeDTO,
} from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
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
  // @modelAction
  // writeCache(fragment: ITypeDTO) {
  //   updateBaseTypeCache(this, fragment)
  //
  //   return this
  // }

  public static hydrate = hydrate
}
