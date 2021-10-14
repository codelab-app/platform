import { TypeKind } from '@codelab/shared/abstract/core'
import { CreateTypeInput } from '../../create-type'
import { UpdateEnumTypeData } from '../update-enum-type.input'

export const createEnumTypeInput = (tagId: string): CreateTypeInput => ({
  name: 'Some Enum',
  typeKind: TypeKind.EnumType,
  tagIds: [tagId],
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
})

export const createUpdateEnumTypeData = (
  updatedTagId: string,
): UpdateEnumTypeData => ({
  name: 'Some Enum',
  tagIds: [updatedTagId],
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
})
