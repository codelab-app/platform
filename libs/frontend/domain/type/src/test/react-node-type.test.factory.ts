import type { IRootStore } from '@codelab/frontend/abstract/application'
import type {
  IReactNodeTypeModel,
  IRootDomainStore,
} from '@codelab/frontend/abstract/domain'
import { TypeKind } from '@codelab/shared/abstract/codegen'
import type { IReactNodeTypeDTO } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

export const ReactNodeTypeTestFactory = (
  rootStore: Partial<IRootDomainStore>,
) =>
  Factory.define<IReactNodeTypeModel, IReactNodeTypeDTO>(
    ({ transientParams }) => {
      const dto: IReactNodeTypeDTO = {
        __typename: TypeKind.ReactNodeType as const,
        id: transientParams.id ?? v4(),
        kind: TypeKind.ReactNodeType,
        name: transientParams.name ?? 'reactNodeType',
      }

      const model = rootStore.typeDomainService?.hydrate(
        dto,
      ) as IReactNodeTypeModel

      return model!
    },
  )
