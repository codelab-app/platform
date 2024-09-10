import type {
  IArrayTypeModel,
  ITypeModel,
  JsonSchema,
  TransformContext,
} from '@codelab/frontend/abstract/domain'
import { typeRef } from '@codelab/frontend/abstract/domain'
import type { IArrayTypeDto } from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { connectNodeId } from '@codelab/shared/domain'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { merge } from 'remeda'
import { createBaseType } from './base-type.model'

const create = ({ id, itemType, kind, name }: IArrayTypeDto): ArrayType => {
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
  writeCache(arrayTypeDto: Partial<IArrayTypeDto>) {
    super.writeCache(arrayTypeDto)

    this.itemType = arrayTypeDto.itemType
      ? typeRef(arrayTypeDto.itemType.id)
      : null

    return this
  }

  toCreateInput() {
    return {
      ...super.toCreateInput(),
      itemType: connectNodeId(this.itemType?.id),
    }
  }

  toJsonSchema({
    defaultValues,
    validationRules,
  }: TransformContext): JsonSchema {
    return {
      items: this.itemType?.isValid
        ? this.itemType.current.toJsonSchema({})
        : {},
      type: 'array',
      ...validationRules?.general,
      default: defaultValues,
    }
  }

  toUpdateInput() {
    return merge(
      {
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
      },
      super.toUpdateInput(),
    )
  }
}
