import type { IAnyType, IArrayType } from '@codelab/frontend/abstract/core'
import { IArrayTypeDTO, ITypeDTO } from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { connectNodeId, makeAllTypes } from '@codelab/shared/domain/mapper'
import merge from 'lodash/merge'
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
    itemType: typeRef(itemType.id),
    kind: kind,
    name: name,
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
  add(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    if (fragment.__typename !== ITypeKind.ArrayType) {
      throw new Error('Invalid ArrayType')
    }

    this.itemType = typeRef(fragment.itemType.id)

    return this
  }

  @modelAction
  writeCache(arrayTypeDTO: IArrayTypeDTO) {
    updateBaseTypeCache(this, arrayTypeDTO)

    return this
  }

  toCreateInput() {
    return {
      ...super.toCreateInput(),
      itemType: makeAllTypes(connectNodeId(this.itemType.id)),
    }
  }

  toUpdateInput() {
    return merge(super.toUpdateInput(), {
      disconnect: {
        itemType: makeAllTypes({
          where: { node: { id_NOT: this.itemType.id } },
        }),
      },
      update: {
        itemType: makeAllTypes(connectNodeId(this.itemType.id)),
      },
    })
  }

  static hydrate = hydrate
}
