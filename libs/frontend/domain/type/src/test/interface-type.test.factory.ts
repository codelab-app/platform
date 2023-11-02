import type { IRootDomainStore } from '@codelab/frontend/abstract/domain'
import { chance } from '@codelab/frontend/domain/shared'
import type { IInterfaceTypeDTO } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { DeepPartial } from 'fishery'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

export const InterfaceTypeTestFactory = (
  rootStore: Partial<IRootDomainStore>,
) =>
  Factory.define<IInterfaceTypeDTO>(({ params }) => {
    const dto: IInterfaceTypeDTO = {
      __typename: `${ITypeKind.InterfaceType}`,
      fields: [],
      id: params.id ?? v4(),
      kind: ITypeKind.InterfaceType,
      name: params.name ?? `${chance.word({ capitalize: true })} API`,
    }

    rootStore.typeDomainService?.hydrateInterface(dto)

    return dto
  })

export const interfaceTypeFactory =
  (rootStore: IRootDomainStore) =>
  (dto: DeepPartial<IInterfaceTypeDTO> = {}) => {
    const interfaceType: IInterfaceTypeDTO = {
      __typename: `${ITypeKind.InterfaceType}`,
      fields: [],
      id: dto.id ?? v4(),
      kind: ITypeKind.InterfaceType,
      name: dto.name ?? `${chance.word({ capitalize: true })} API`,
    }

    return rootStore.typeDomainService.hydrateInterface(interfaceType)
  }
