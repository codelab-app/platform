import type { IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { titleCase } from 'voca'
import { upsertType } from '../../../repository/type.repo'
import type { FieldTypeRef } from '../utils/type-predicates'

export const getPrimitiveTypeForApi: FieldTypeRef = async ({
  field,
  userId,
}) => {
  /**
   * Type should already exist, but we use upsert method as convenience
   */
  const primitiveType = await upsertType(
    {
      id: v4(),
      __typename: ITypeKind.PrimitiveType,
      kind: ITypeKind.PrimitiveType,
      name: titleCase(field.type),
      primitiveKind: titleCase(field.type) as IPrimitiveTypeKind,
    },
    userId,
    (type) => ({ name: type.name }),
  )

  if (!primitiveType) {
    throw new Error('Missing primitive type')
  }

  return {
    existingId: primitiveType.id,
  }
}
