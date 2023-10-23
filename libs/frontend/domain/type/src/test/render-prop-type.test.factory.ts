import type { IRootStore } from '@codelab/frontend/abstract/application'
import { TypeKind } from '@codelab/shared/abstract/codegen'
import type { IRenderPropTypeDTO } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

export const RenderPropTypeTestFactory = (rootStore: Partial<IRootStore>) =>
  Factory.define<IRenderPropTypeDTO>(({ params }) => {
    const dto: IRenderPropTypeDTO = {
      __typename: TypeKind.RenderPropType as const,
      id: params.id ?? v4(),
      kind: TypeKind.RenderPropType,
      name: params.name ?? 'renderPropType',
    }

    rootStore.typeService?.typeDomainService.hydrate(dto)

    return dto
  })
