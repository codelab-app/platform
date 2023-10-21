import { TypeKind } from '@codelab/shared/abstract/codegen'
import type { IRenderPropTypeDTO } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'
import { createTestRootStore } from '../setup/test-root-store'

export default Factory.define<IRenderPropTypeDTO>(({ params }) => {
  const dto = {
    __typename: TypeKind.RenderPropType as 'RenderPropType',
    id: params.id ?? v4(),
    kind: TypeKind.RenderPropType,
    name: params.name ?? 'renderPropType',
  }

  createTestRootStore().typeService.typeDomainService.add(dto)

  return dto
})
