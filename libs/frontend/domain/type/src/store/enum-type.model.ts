import type {
  IEnumType,
  IEnumTypeValue,
  JsonSchema,
  TransformContext,
} from '@codelab/frontend/abstract/domain'
import type { IEnumTypeDto } from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { merge } from 'remeda'
import { createBaseType } from './base-type.model'
import { EnumTypeValue } from './enum-type-value.model'

const create = ({ allowedValues, id, kind, name }: IEnumTypeDto) => {
  assertIsTypeKind(kind, ITypeKind.EnumType)

  return new EnumType({
    allowedValues: allowedValues.map((allowedValue) =>
      EnumTypeValue.create(allowedValue),
    ),
    id,
    kind,
    name,
  })
}

@model('@codelab/EnumType')
export class EnumType
  extends ExtendedModel(createBaseType(ITypeKind.EnumType), {
    allowedValues: prop<Array<IEnumTypeValue>>(() => []),
  })
  implements IEnumType
{
  public static create = create

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

  toCreateInput() {
    return {
      ...super.toCreateInput(),
      allowedValues: {
        create: this.allowedValues.map((value) => ({
          node: {
            id: value.id,
            key: value.key,
            value: value.value,
          },
        })),
      },
    }
  }

  toJsonSchema({
    defaultValues,
    validationRules,
  }: TransformContext): JsonSchema {
    return {
      enum: this.allowedValues.map((allowedValue) => allowedValue.value),
      type: 'string',
      ...validationRules?.general,
      default: defaultValues,
    }
  }

  toUpdateInput() {
    return merge(
      {
        // For some reason if the disconnect and delete are in the update section it throws an error
        delete: {
          allowedValues: [
            {
              where: {
                node: {
                  NOT: {
                    id_IN: this.allowedValues.map((av) => av.id),
                  },
                },
              },
            },
          ],
        },
        update: {
          allowedValues: [
            {
              create: this.allowedValues.map((value) => ({
                node: {
                  id: value.id,
                  key: value.key,
                  value: value.value,
                },
              })),
            },
          ],
        },
      },
      super.toUpdateInput(),
    )
  }
}
