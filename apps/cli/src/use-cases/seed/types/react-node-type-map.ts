import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { FieldTypeRef } from '../utils/type-predicates'

export const getReactNodeTypeForApi: FieldTypeRef = async () => {
  const ReactNodeType = await Repository.instance.ReactNodeType

  const [renderNodeType] = await ReactNodeType.find({
    where: {
      name: ITypeKind.ReactNodeType,
    },
  })

  return {
    existingId: renderNodeType.id,
  }
}
