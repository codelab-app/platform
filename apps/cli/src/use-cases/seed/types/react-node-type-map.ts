import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { FieldTypeRef } from '../utils/type-predicates'

export const getReactNodeTypeForApi: FieldTypeRef = async () => {
  const ReactNodeType = await Repository.instance.ReactNodeType

  const [renderNodeType] = await ReactNodeType.find({
    where: {
      name: ITypeKind.ReactNodeType,
    },
  })

  if (!renderNodeType) {
    throw new Error('Render node type not found')
  }

  return {
    existingId: renderNodeType.id,
  }
}
