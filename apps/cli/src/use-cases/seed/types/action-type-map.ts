import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { FieldTypeRef } from '../utils/type-predicates'

export const getActionTypeForApi: FieldTypeRef = async () => {
  const ActionType = await Repository.instance.ActionType

  const [existingAction] = await ActionType.find({
    where: {
      name: ITypeKind.ActionType,
    },
  })

  if (!existingAction) {
    throw new Error('Action type not found')
  }

  return {
    existingId: existingAction.id,
  }
}
