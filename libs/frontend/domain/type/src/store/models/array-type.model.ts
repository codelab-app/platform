import type {
  IAnyType,
  IArrayType,
  IArrayTypeDTO,
} from '@codelab/frontend/abstract/core'
import { ITypeDTO } from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createBaseType } from './base-type.model'
import { typeRef } from './union-type.model'

const hydrate = ({
  id,
  kind,
  name,
  owner,
  itemType,
}: IArrayTypeDTO): ArrayType => {
  assertIsTypeKind(kind, ITypeKind.ArrayType)

  return new ArrayType({
    id: id,
    kind: kind,
    name: name,
    itemType: typeRef(itemType.id),
    owner: owner,
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
  create(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    if (fragment.__typename !== ITypeKind.ArrayType) {
      throw new Error('Invalid ArrayType')
    }

    this.itemType = typeRef(fragment.itemType.id)

    return this
  }

  static hydrate = hydrate
}
