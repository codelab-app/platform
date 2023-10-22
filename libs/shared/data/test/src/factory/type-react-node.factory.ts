import { TypeKind } from '@codelab/shared/abstract/codegen'
import type { IReactNodeTypeDTO } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

export default Factory.define<IReactNodeTypeDTO>(({ params }) => {
  const dto = {
    __typename: TypeKind.ReactNodeType as const,
    id: params.id ?? v4(),
    kind: TypeKind.ReactNodeType,
    name: params.name ?? 'reactNodeType',
  }

  // testRootStore.typeService.add(dto)

  return dto
})
