import {
  assertIsTypeKind,
  IAnyType,
  IArrayType,
  IArrayTypeDTO,
  ITypeDTO,
  ITypeKind,
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

  assertIsTypeKind(fragment.kind, ITypeKind.ArrayType)

  return new ArrayType({
    id: fragment.id,
    kind: fragment.kind,
    name: fragment.name,
    itemType,
    ownerId: fragment.owner.id,
  })
}

@model('@codelab/ArrayType')
export class ArrayType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(ITypeKind.ArrayType),
    props: {
      itemType: prop<Ref<IAnyType>>(),
    },
  }))
  implements IArrayType
{
  @modelAction
  updateCache(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    if (fragment.__typename !== ITypeKind.ArrayType) {
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
