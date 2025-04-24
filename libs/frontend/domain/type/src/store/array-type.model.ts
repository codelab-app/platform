import type {
  IArrayTypeModel,
  ITypeModel,
  ITypeTransformContext,
  JsonSchema,
} from '@codelab/frontend-abstract-domain'
import type { IArrayTypeDto } from '@codelab/shared-abstract-core'
import type { Nullable } from '@codelab/shared-abstract-types'
import type { Ref } from 'mobx-keystone'

import { typeRef, userRef } from '@codelab/frontend-abstract-domain'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared-abstract-core'
import { connectNodeId } from '@codelab/shared-domain-orm'
import { computed } from 'mobx'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { mergeDeep } from 'remeda'

import { createBaseType } from './base-type.model'

const create = ({
  id,
  itemType,
  kind,
  name,
  owner,
}: IArrayTypeDto): ArrayType => {
  assertIsTypeKind(kind, ITypeKind.ArrayType)

  return new ArrayType({
    id,
    itemType: itemType ? typeRef(itemType.id) : null,
    kind,
    name,
    owner: userRef(owner.id),
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

  @computed
  get toJson(): IArrayTypeDto {
    return {
      __typename: this.__typename,
      id: this.id,
      itemType: this.itemType?.maybeCurrent,
      kind: this.kind,
      name: this.name,
      owner: this.owner.current.toJson,
    }
  }

  toJsonSchema({
    defaultValues,
    depth,
    fieldName,
    uniformSchema,
    validationRules,
  }: ITypeTransformContext): JsonSchema {
    return {
      items: this.itemType?.isValid
        ? this.itemType.current.toJsonSchema({
            defaultValues,
            depth,
            fieldName,
            uniformSchema,
            validationRules,
          })
        : {},
      type: 'array',
      ...(uniformSchema?.(this) ?? {}),
      ...validationRules?.general,
      default: defaultValues,
    }
  }

  toUpdateInput() {
    return mergeDeep({
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

  @modelAction
  writeCache(arrayTypeDto: Partial<IArrayTypeDto>) {
    super.writeCache(arrayTypeDto)

    this.itemType = arrayTypeDto.itemType
      ? typeRef(arrayTypeDto.itemType.id)
      : null

    return this
  }
}
