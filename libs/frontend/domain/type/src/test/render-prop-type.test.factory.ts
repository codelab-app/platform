import type {
  IRenderPropTypeModel,
  IRootDomainStore,
} from '@codelab/frontend/abstract/domain'
import { TypeKind } from '@codelab/shared/abstract/codegen'
import type { IRenderPropTypeDTO } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

export const RenderPropTypeTestFactory = (
  rootStore: Partial<IRootDomainStore>,
) =>
  Factory.define<IRenderPropTypeModel, IRenderPropTypeDTO>(
    ({ transientParams }) => {
      const dto: IRenderPropTypeDTO = {
        __typename: TypeKind.RenderPropType as const,
        id: transientParams.id ?? v4(),
        kind: TypeKind.RenderPropType,
        name: transientParams.name ?? 'renderPropType',
      }

      const model = rootStore.typeDomainService?.hydrate(
        dto,
      ) as IRenderPropTypeModel

      return model!
    },
  )
