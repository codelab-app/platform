import { TypeKind } from '@codelab/shared/abstract/codegen'
import type { IRenderPropTypeDTO } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'
import { rootStore as testRootStore } from '../setup'

export default Factory.define<IRenderPropTypeDTO>(({ params }) => {
  const dto = {
    __typename: TypeKind.RenderPropType as 'RenderPropType',
    id: params.id ?? v4(),
    kind: TypeKind.RenderPropType,
    name: params.name ?? 'renderPropType',
  }

  testRootStore.typeService.add(dto)

  return dto
})
