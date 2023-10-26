import type {
  IArrayTypeModel,
  ITypeModel,
} from '@codelab/frontend/abstract/domain'
import { typeRef } from '@codelab/frontend/abstract/domain'
import type { IArrayTypeDTO } from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { connectNodeId } from '@codelab/shared/domain/mapper'
import merge from 'lodash/merge'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { createBaseType } from './base-type.model'

const create = ({ id, itemType, kind, name }: IArrayTypeDTO): ArrayType => {
  assertIsTypeKind(kind, ITypeKind.ArrayType)

  return new ArrayType({
    id,
    itemType: itemType ? typeRef(itemType.id) : null,
    kind,
    name,
  })
}

@model('@codelab/ArrayType')
export class ArrayType
  extends ExtendedModel(createBaseType(ITypeKind.ArrayType), {
    itemType: prop<Nullable<Ref<ITypeModel>>>(null),
  })
  implements IArrayTypeModel
{
  static create = create

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
      disconnect: this.itemType?.id
        ? {
            itemType: {
              where: {
                NOT: {
                  node: {
                    id: this.itemType.id,
                  },
                },
              },
            },
          }
        : undefined,
      update: this.itemType?.id
        ? {
            itemType: connectNodeId(this.itemType.id),
          }
        : undefined,
    })
  }
}