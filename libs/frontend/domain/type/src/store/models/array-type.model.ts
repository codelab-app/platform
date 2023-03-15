import type {
  IArrayType,
  IArrayTypeDTO,
  IType,
} from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { connectNodeId } from '@codelab/shared/domain/mapper'
import merge from 'lodash/merge'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
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
  writeCache(arrayTypeDTO: Partial<IArrayTypeDTO>) {
    super.writeCache(arrayTypeDTO)

    this.itemType = arrayTypeDTO.itemType
      ? typeRef(arrayTypeDTO.itemType.id)
      : null

    return this
  }

  toCreateInput() {
    return {
      ...super.toCreateInput(),
      itemType: connectNodeId(this.itemType?.id),
    }
  }

  toUpdateInput() {
    return merge(super.toUpdateInput(), {
      disconnect: {
        itemType: {
          where: { node: { id_NOT: this.itemType?.id } },
        },
      },
      update: {
        itemType: connectNodeId(this.itemType?.id),
      },
    })
  }

  static create = create
}
