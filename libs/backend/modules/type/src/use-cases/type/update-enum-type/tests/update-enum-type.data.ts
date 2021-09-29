import { TypeKind } from '@codelab/shared/abstract/core'
import { CreateTypeInput } from '../../create-type'
import { UpdateEnumTypeData } from '../update-enum-type.input'

export const createEnumTypeInput: CreateTypeInput = {
  name: 'Some Enum',
  typeKind: TypeKind.EnumType,
  enumType: {
    allowedValues: [
      {
        name: 'First',
        value: 'first',
      },
      {
        name: 'Second',
        value: 'second',
      },
    ],
  },
}

export const updateEnumTypeData: UpdateEnumTypeData = {
  name: 'Some Enum',
  allowedValues: [
    {
      name: 'First',
      value: 'first',
    },
    {
      name: 'Second',
      value: 'second',
    },
    {
      name: 'Third',
      value: 'third',
    },
  ],
}
