import type { IRootStore } from '@codelab/frontend/abstract/application'
import { chance } from '@codelab/frontend/domain/shared'
import { PrimitiveTypeKind, TypeKind } from '@codelab/shared/abstract/codegen'
import type { IPrimitiveTypeDTO } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

export const PrimitiveTypeTestFactory = (rootStore: Partial<IRootStore>) =>
  Factory.define<IPrimitiveTypeDTO>(({ params }) => {
    const dto: IPrimitiveTypeDTO = {
      __typename: TypeKind.PrimitiveType as const,
      id: params.id ?? v4(),
      kind: TypeKind.PrimitiveType,
      name: params.name ?? chance.word({ capitalize: true }),
      primitiveKind: params.primitiveKind ?? PrimitiveTypeKind.String,
    }

    rootStore.typeService?.typeDomainService.hydrate(dto)

    return dto
  })
