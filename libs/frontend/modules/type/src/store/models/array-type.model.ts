import {
  IAnyType,
  IArrayType,
  IArrayTypeDTO,
  ITypeDTO,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop, Ref } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createTypeBase } from './base-type.model'
import { typeRef } from './union-type.model'

const hydrate = (fragment: IArrayTypeDTO): ArrayType => {
  const itemId = fragment.itemType.id
  const itemType = typeRef(itemId)

  if (!itemType) {
    throw new Error('Item type is invalid')
  }

  return new ArrayType({
    id: fragment.id,
    typeKind: fragment.typeKind,
    name: fragment.name,
    itemType,
    ownerId: fragment.owner.id,
  })
}

@model('@codelab/ArrayType')
export class ArrayType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(TypeKind.ArrayType),
    props: {
      itemType: prop<Ref<IAnyType>>(),
    },
  }))
  implements IArrayType
{
  @modelAction
  updateCache(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    if (fragment.typeKind !== TypeKind.ArrayType) {
      return
    }

    const itemId = fragment.itemType.id
    this.itemType = typeRef(itemId)
  }

  // @modelAction
  // override applyUpdateData(input: IUpdateTypeDTO) {
  //   super.applyUpdateData(input)
  // }

  static hydrate = hydrate
}
