import type {
  IEnumType,
  IEnumTypeDTO,
  IEnumTypeValue,
} from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import merge from 'lodash/merge'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { createBaseType } from './base-type.model'
import { EnumTypeValue } from './enum-type-value.model'

const create = ({ allowedValues, id, kind, name, owner }: IEnumTypeDTO) => {
  assertIsTypeKind(kind, ITypeKind.EnumType)

  return new EnumType({
    allowedValues: allowedValues.map((allowedValue) =>
      EnumTypeValue.create(allowedValue),
    ),
    id,
    kind,
    name,
    owner,
  })
}

@model('@codelab/EnumType')
export class EnumType
  extends ExtendedModel(createBaseType(ITypeKind.EnumType), {
    allowedValues: prop<Array<IEnumTypeValue>>(() => []),
  })
  implements IEnumType
{
  @modelAction
  writeCache(enumTypeDTO: Partial<IEnumTypeDTO>) {
    super.writeCache(enumTypeDTO)

    this.allowedValues = enumTypeDTO.allowedValues
      ? enumTypeDTO.allowedValues.map((allowedValue) =>
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

  toUpdateInput() {
    return merge(super.toUpdateInput(), {
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
    })
  }

  public static create = create
}
