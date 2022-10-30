import type {
  IArrayType,
  IArrayTypeDTO,
  ITypeDTO,
} from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createBaseType } from './base-type.model'
import { typeRef } from './union-type.model'

const hydrate = (fragment: IArrayTypeDTO): ArrayType => {
  const itemId = fragment.itemType.id
  const itemType = typeRef(itemId)

  assertIsTypeKind(fragment.kind, ITypeKind.ArrayType)

  return new ArrayType({
    id: fragment.id,
    kind: fragment.kind,
    name: fragment.name,
    itemType: fragment.itemType,
    ownerId: fragment.owner.id,
  })
}

@model('@codelab/ArrayType')
export class ArrayType
  extends ExtendedModel(createBaseType(ITypeKind.ArrayType), {
    itemType: prop<{ id: string; name: string }>(),
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
    this.itemType = fragment.itemType

    return this
  }

  static hydrate = hydrate
}
