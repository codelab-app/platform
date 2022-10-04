import { TypeRef } from '@codelab/backend/abstract/core'
import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { ITypeKind } from '@codelab/shared/abstract/core'

export const getReactNodeTypeForApi = async (): Promise<TypeRef> => {
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
