import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { FieldTypeRef } from '../utils/type-predicates'

export const getRenderPropTypeForApi: FieldTypeRef = async () => {
  const RenderPropsType = await Repository.instance.RenderPropsType

  const [renderPropsType] = await RenderPropsType.find({
    where: {
      name: ITypeKind.RenderPropsType,
    },
  })

  if (!renderPropsType) {
    throw new Error('Render props type not found')
  }

  return {
    existingId: renderPropsType.id,
  }
}
