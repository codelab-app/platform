import { RenderPropsTypeOGM } from '@codelab/backend/adapter/neo4j'
import { ITypeKind } from '@codelab/shared/abstract/core'

type TypeRef = {
  existingId: string
} | null

export const getRenderPropTypeForApi = async (): Promise<TypeRef> => {
  const RenderPropsType = await RenderPropsTypeOGM()

  const [renderPropsType] = await RenderPropsType.find({
    where: {
      name: ITypeKind.RenderPropsType,
    },
  })

  return {
    existingId: renderPropsType.id,
  }
}
