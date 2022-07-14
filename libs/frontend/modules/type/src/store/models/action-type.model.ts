import {
  assertIsTypeKind,
  IAnyActionType,
  IAnyActionTypeDTO,
  ITypeDTO,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
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
  @modelAction
  updateCache(fragment: ITypeDTO): void {
    updateBaseTypeCache(this, fragment)
  }

  // @modelAction
  // override actionlyUpdateData(input: IUpdateTypeDTO) {
  //   super.actionlyUpdateData(input)
  // }

  public static hydrate = hydrate
}
