import { ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { upsertType } from '../../../repository/type.repo'
import type { FieldTypeRef } from '../utils/type-predicates'

export const getActionTypeForApi: FieldTypeRef = async ({ userId }) => {
  const actionType = await upsertType(
    {
      id: v4(),
      __typename: ITypeKind.ActionType,
      kind: ITypeKind.ActionType,
      name: ITypeKind.ActionType,
    },
    userId,
    (type) => ({ name: type.name }),
  )

  if (!actionType) {
    throw new Error('ActionType not found')
  }

  return {
    existingId: actionType.id,
  }
}
