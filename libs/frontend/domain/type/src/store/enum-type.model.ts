import type { IEnumTypeDto } from '@codelab/shared/abstract/core'

import {
  type IEnumTypeModel,
  type IEnumTypeValue,
  type ITypeTransformContext,
  type JsonSchema,
  userRef,
} from '@codelab/frontend/abstract/domain'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'

import { createBaseType } from './base-type.model'
import { EnumTypeValue } from './enum-type-value.model'

const create = ({ allowedValues, id, kind, name, owner }: IEnumTypeDto) => {
  assertIsTypeKind(kind, ITypeKind.EnumType)

  return new EnumType({
    allowedValues: allowedValues.map((allowedValue) =>
      EnumTypeValue.create(allowedValue),
    ),
    id,
    kind,
    name,
    owner: userRef(owner.id),
  })
}

@model('@codelab/EnumType')
export class EnumType
  extends ExtendedModel(createBaseType(ITypeKind.EnumType), {
    allowedValues: prop<Array<IEnumTypeValue>>(() => []),
  })
  implements IEnumTypeModel
{
  public static create = create

  get toJson() {
    return {
      __typename: this.__typename,
      allowedValues: this.allowedValues,
      id: this.id,
      kind: this.kind,
      name: this.name,
      owner: this.owner.current.toJson,
    }
  }

  @modelAction
  writeCache(enumTypeDto: Partial<IEnumTypeDto>) {
    super.writeCache(enumTypeDto)

    this.allowedValues = enumTypeDto.allowedValues
      ? enumTypeDto.allowedValues.map((allowedValue) =>
          EnumTypeValue.create(allowedValue),
        )
      : this.allowedValues

    return this
  }

  toJsonSchema({
    defaultValues,
    uniformSchema,
    validationRules,
  }: ITypeTransformContext): JsonSchema {
    return {
      enum: this.allowedValues.map((allowedValue) => allowedValue.value),
      type: 'string',
      ...validationRules?.general,
      ...(uniformSchema?.(this) ?? {}),
      // for the enum, the default value cannot be "null", in this case ajv
      // will report error even if the filed has "nullable: true" in schema.
      // instead, the default value should be "undefined" to allow optional enums
      default: defaultValues ?? undefined,
    }
  }
}
