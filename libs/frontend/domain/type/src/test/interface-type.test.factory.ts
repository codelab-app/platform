import type { ITypeDomainService } from '@codelab/frontend/abstract/domain'
import type { IInterfaceTypeDto } from '@codelab/shared/abstract/core'

import { chance } from '@codelab/frontend-domain-shared'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const interfaceTypeFactory =
  (typeDomainService: ITypeDomainService) =>
  (dto: Partial<IInterfaceTypeDto> = {}) => {
    const interfaceType: IInterfaceTypeDto = {
      __typename: ITypeKind.InterfaceType,
      fields: [],
      id: dto.id ?? v4(),
      kind: ITypeKind.InterfaceType,
      name: dto.name ?? `${chance.word({ capitalize: true })} API`,
      owner: { id: v4() },
    }

    return typeDomainService.hydrateInterface(interfaceType)
  }
