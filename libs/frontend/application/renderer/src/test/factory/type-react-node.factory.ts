import { TypeKind } from '@codelab/shared/abstract/codegen'
import type { IReactNodeTypeDTO } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'
import { createTestRootStore } from '../setup/test-root-store'

export default Factory.define<IReactNodeTypeDTO>(({ params }) => {
  const dto = {
    __typename: TypeKind.ReactNodeType as 'ReactNodeType',
    id: params.id ?? v4(),
    kind: TypeKind.ReactNodeType,
    name: params.name ?? 'reactNodeType',
  }

  createTestRootStore().typeService.typeDomainService.add(dto)

  return dto
})
