import type {
  IPrimitiveTypeModel,
  ITypeTransformContext,
  JsonSchema,
} from '@codelab/frontend/abstract/domain'
import type { IPrimitiveTypeDto } from '@codelab/shared/abstract/core'
import {
  assertIsTypeKind,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { PrimitiveTypeKind } from '@codelab/shared/infra/gql'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { isBoolean, merge } from 'remeda'
import { createBaseType } from './base-type.model'

export const primitives = {
  [PrimitiveTypeKind.String]: 'string' as const,
  [PrimitiveTypeKind.Integer]: 'integer' as const,
  [PrimitiveTypeKind.Number]: 'number' as const,
  [PrimitiveTypeKind.Boolean]: 'boolean' as const,
}

const create = ({ id, kind, name, primitiveKind }: IPrimitiveTypeDto) => {
  assertIsTypeKind(kind, ITypeKind.PrimitiveType)

  return new PrimitiveType({
    id,
    kind,
    name,
    primitiveKind,
  })
}

@model('@codelab/PrimitiveType')
export class PrimitiveType
  extends ExtendedModel(createBaseType(ITypeKind.PrimitiveType), {
    primitiveKind: prop<PrimitiveTypeKind>(),
  })
  implements IPrimitiveTypeModel
{
  public static create = create

  @modelAction
  writeCache(primitiveTypeDto: Partial<IPrimitiveTypeDto>) {
    super.writeCache(primitiveTypeDto)

    this.primitiveKind = primitiveTypeDto.primitiveKind ?? this.primitiveKind

    return this
  }

  toCreateInput() {
    return {
      ...super.toCreateInput(),
      primitiveKind: this.primitiveKind,
    }
  }

  toJsonSchema({
    defaultValues,
    validationRules,
  }: ITypeTransformContext): JsonSchema {
    const rulesSchema =
      this.primitiveKind === IPrimitiveTypeKind.Boolean
        ? {
            ...validationRules?.general,
            ...(isBoolean(defaultValues)
              ? { default: Boolean(defaultValues) }
              : { default: false }),
          }
        : {
            ...validationRules?.[this.primitiveKind],
            ...validationRules?.general,
            ...(defaultValues ? { default: defaultValues } : {}),
          }

    return {
      ...rulesSchema,
      type: primitives[this.primitiveKind],
    }
  }

  toUpdateInput() {
    return merge(
      {
        update: {
          primitiveKind: this.primitiveKind,
        },
      },
      super.toUpdateInput(),
    )
  }
}
