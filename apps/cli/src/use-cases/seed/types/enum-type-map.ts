import { ITypeKind } from '@codelab/shared/abstract/core'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import { upsertType } from '../../../repository/type.repo'
import { parseSeparators } from '../utils/parser'
import { FieldTypeRef } from '../utils/type-predicates'

export const getEnumTypeForApi: FieldTypeRef = async ({
  field,
  atom,
  userId,
}) => {
  const values = parseSeparators(field)

  const enumType = await upsertType(
    {
      id: v4(),
      __typename: ITypeKind.EnumType,
      kind: ITypeKind.EnumType,
      name: `${atom.name} ${compoundCaseToTitleCase(field.property)} Enum`,
      allowedValues: values.map((value) => ({
        id: v4(),
        key: value,
        value: value,
      })),
    },
    userId,
    (type) => ({ name: type.name }),
  )

  if (!enumType) {
    throw new Error('EnumType not found')
  }

  return {
    existingId: enumType.id,
  }
}
