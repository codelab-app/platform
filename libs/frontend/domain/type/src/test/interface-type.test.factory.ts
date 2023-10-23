import type { IRootStore } from '@codelab/frontend/abstract/application'
import type { ICreateTypeData } from '@codelab/frontend/abstract/domain'
import { chance } from '@codelab/frontend/domain/shared'
import type { IInterfaceTypeDTO } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

export const InterfaceTypeTestFactory = (rootStore: Partial<IRootStore>) =>
  Factory.define<IInterfaceTypeDTO>(({ params }) => {
    const dto: IInterfaceTypeDTO = {
      __typename: `${ITypeKind.InterfaceType}`,
      fields: [],
      id: params.id ?? v4(),
      kind: ITypeKind.InterfaceType,
      name: params.name ?? `${chance.word({ capitalize: true })} API`,
    }

    rootStore.typeService?.typeDomainService.hydrateInterface(dto)

    return dto
  })
