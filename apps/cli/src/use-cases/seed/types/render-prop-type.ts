import { ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { upsertType } from '../../../repository/type.repo'
import { FieldTypeRef } from '../utils/type-predicates'

export const getRenderPropTypeForApi: FieldTypeRef = async ({ userId }) => {
  const renderPropType = await upsertType(
    {
      id: v4(),
      __typename: ITypeKind.RenderPropsType,
      kind: ITypeKind.RenderPropsType,
      name: ITypeKind.RenderPropsType,
    },
    userId,
    (type) => ({ name: type.name }),
  )

  if (!renderPropType) {
    throw new Error('RenderPropType not found')
  }

  return {
    existingId: renderPropType.id,
  }
}
