import { TypeRef } from '@codelab/backend/abstract/core'
import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { ITypeKind } from '@codelab/shared/abstract/core'

export const getRenderPropTypeForApi = async (): Promise<TypeRef> => {
  const RenderPropsType = await Repository.instance.RenderPropsType

  const [renderPropsType] = await RenderPropsType.find({
    where: {
      name: ITypeKind.RenderPropsType,
    },
  })

  return {
    existingId: renderPropsType.id,
  }
}
