import type { IRootStore } from '@codelab/frontend/abstract/application'
import { TypeKind } from '@codelab/shared/abstract/codegen'
import type { IReactNodeTypeDTO } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

export const ReactNodeTypeTestFactory = (rootStore: Partial<IRootStore>) =>
  Factory.define<IReactNodeTypeDTO>(({ params }) => {
    const dto: IReactNodeTypeDTO = {
      __typename: TypeKind.ReactNodeType as const,
      id: params.id ?? v4(),
      kind: TypeKind.ReactNodeType,
      name: params.name ?? 'reactNodeType',
    }

    rootStore.typeService?.typeDomainService.hydrate(dto)

    return dto
  })
