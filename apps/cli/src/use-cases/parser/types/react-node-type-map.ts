import { ReactNodeTypeOGM } from '@codelab/backend/adapter/neo4j'
import { ITypeKind } from '@codelab/shared/abstract/core'

// import { PrimitiveTypeKind } from

type TypeRef = {
  existingId: string
} | null

export const getReactNodeTypeForApi = async (): Promise<TypeRef> => {
  const ReactNodeType = await ReactNodeTypeOGM()

  const [renderNodeType] = await ReactNodeType.find({
    where: {
      name: ITypeKind.ReactNodeType,
    },
  })

  return {
    existingId: renderNodeType.id,
  }
}
