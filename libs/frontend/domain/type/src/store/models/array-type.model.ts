import type {
  IAnyType,
  IArrayType,
  IArrayTypeDTO,
  ITypeDTO,
} from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop, Ref } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createBaseType } from './base-type.model'
import { typeRef } from './union-type.model'

const hydrate = (fragment: IArrayTypeDTO): ArrayType => {
  assertIsTypeKind(fragment.kind, ITypeKind.ArrayType)

  return new ArrayType({
    id: fragment.id,
    kind: fragment.kind,
    name: fragment.name,
    itemType: typeRef(fragment.itemType.id),
    ownerId: fragment.owner.id,
  })
}

@model('@codelab/ArrayType')
export class ArrayType
  extends ExtendedModel(createBaseType(ITypeKind.ArrayType), {
    itemType: prop<Ref<IAnyType>>(),
  })
  implements IArrayType
{
  @modelAction
  writeCache(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    if (fragment.__typename !== ITypeKind.ArrayType) {
      throw new Error('Invalid ArrayType')
    }

    this.itemType = typeRef(fragment.itemType.id)

    return this
  }

  static hydrate = hydrate
}
