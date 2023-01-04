import { ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { upsertType } from '../../../repository/type.repo'
import type { FieldTypeRef } from '../utils/type-predicates'

export const getReactNodeTypeForApi: FieldTypeRef = async ({ userId }) => {
  const reactNodeType = await upsertType(
    {
      id: v4(),
      __typename: ITypeKind.ReactNodeType,
      kind: ITypeKind.ReactNodeType,
      name: ITypeKind.ReactNodeType,
    },
    userId,
    (type) => ({ name: type.name }),
  )

  if (!reactNodeType) {
    throw new Error('ReactNodeType not found')
  }

  return {
    existingId: reactNodeType.id,
  }
}
