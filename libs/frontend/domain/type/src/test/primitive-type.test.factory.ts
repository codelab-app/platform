import type { ITypeDomainService } from '@codelab/frontend/abstract/domain'
import { chance } from '@codelab/frontend/domain/shared'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import {
  type IPrimitiveTypeDto,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const primitiveTypeFactory =
  (typeDomainService: ITypeDomainService) =>
  (dto: Partial<IPrimitiveTypeDto>) => {
    const primitiveType: IPrimitiveTypeDto = {
      __typename: ITypeKind.PrimitiveType as const,
      id: dto.id ?? v4(),
      kind: ITypeKind.PrimitiveType,
      name: dto.name ?? chance.word({ capitalize: true }),
      primitiveKind: dto.primitiveKind ?? PrimitiveTypeKind.String,
    }

    return typeDomainService.hydrate(primitiveType)
  }
