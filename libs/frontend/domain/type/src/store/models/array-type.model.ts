import type { IArrayType, IType } from '@codelab/frontend/abstract/core'
import { IArrayTypeDTO, ITypeDTO } from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { connectNodeId, makeAllTypes } from '@codelab/shared/domain/mapper'
import merge from 'lodash/merge'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createBaseType } from './base-type.model'
import { typeRef } from './union-type.model'

const create = ({
  id,
  itemType,
  kind,
  name,
  owner,
}: IArrayTypeDTO): ArrayType => {
  assertIsTypeKind(kind, ITypeKind.ArrayType)

  return new ArrayType({
    id,
    itemType: itemType ? typeRef(itemType.id) : null,
    kind,
    name,
    owner,
  })
}

@model('@codelab/ArrayType')
export class ArrayType
  extends ExtendedModel(createBaseType(ITypeKind.ArrayType), {
    itemType: prop<Nullable<Ref<IType>>>(null),
  })
  implements IArrayType
{
  @modelAction
  add(typeDTO: ITypeDTO) {
    updateBaseTypeCache(this, typeDTO)

    if (typeDTO.__typename !== ITypeKind.ArrayType) {
      throw new Error('Invalid ArrayType')
    }

    this.itemType = typeDTO.itemType ? typeRef(typeDTO.itemType.id) : null

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
      itemType: makeAllTypes(connectNodeId(this.itemType?.id)),
    }
  }

  toUpdateInput() {
    return merge(super.toUpdateInput(), {
      disconnect: {
        itemType: makeAllTypes({
          where: { node: { id_NOT: this.itemType?.id } },
        }),
      },
      update: {
        itemType: makeAllTypes(connectNodeId(this.itemType?.id)),
      },
    })
  }

  static create = create
}
