import type {
  IAnyType,
  IArrayType,
  IArrayTypeDTO,
  ITypeDTO,
} from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop, Ref } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createTypeBase } from './base-type.model'
import { typeRef } from './union-type.model'

const hydrate = (fragment: IArrayTypeDTO): ArrayType => {
  const itemTypeId = fragment.itemType?.id
  assertIsTypeKind(fragment.kind, ITypeKind.ArrayType)

  return new ArrayType({
    id: fragment.id,
    kind: fragment.kind,
    name: fragment.name,
    itemTypeId,
    ownerId: fragment.owner.id,
  })
}

@model('@codelab/ArrayType')
export class ArrayType
  extends ExtendedModel(createTypeBase(ITypeKind.ArrayType), {
    itemTypeId: prop<string>(),
  })
  implements IArrayType
{
  @modelAction
  writeCache(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    if (fragment.__typename !== ITypeKind.ArrayType) {
      throw new Error('Invalid ArrayType')
    }

    const itemId = fragment.itemType.id
    this.itemType = typeRef(itemId)

    return this
  }

  static hydrate = hydrate
}
