import type { IPrimitiveTypeDto } from '@codelab/shared/abstract/core'

import {
  type IPrimitiveTypeModel,
  type ITypeTransformContext,
  type JsonSchema,
  userRef,
} from '@codelab/frontend/abstract/domain'
import {
  assertIsTypeKind,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { PrimitiveTypeKind } from '@codelab/shared/infra/gqlgen'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { isBoolean } from 'remeda'

import { createBaseType } from './base-type.model'

export const primitives = {
  [PrimitiveTypeKind.Boolean]: 'boolean' as const,
  [PrimitiveTypeKind.Integer]: 'integer' as const,
  [PrimitiveTypeKind.Number]: 'number' as const,
  [PrimitiveTypeKind.String]: 'string' as const,
}

const create = ({
  id,
  kind,
  name,
  owner,
  primitiveKind,
}: IPrimitiveTypeDto) => {
  assertIsTypeKind(kind, ITypeKind.PrimitiveType)

  return new PrimitiveType({
    id,
    kind,
    name,
    owner: userRef(owner.id),
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

  get toJson() {
    return {
      __typename: this.__typename,
      id: this.id,
      kind: this.kind,
      name: this.name,
      owner: this.owner.current.toJson,
      primitiveKind: this.primitiveKind,
    }
  }

  @modelAction
  writeCache(primitiveTypeDto: Partial<IPrimitiveTypeDto>) {
    super.writeCache(primitiveTypeDto)

    this.primitiveKind = primitiveTypeDto.primitiveKind ?? this.primitiveKind

    return this
  }

  toJsonSchema({
    defaultValues,
    uniformSchema,
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
      ...(uniformSchema?.(this) ?? {}),
      type: primitives[this.primitiveKind],
    }
  }
}
