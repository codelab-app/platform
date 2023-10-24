import type { IRootStore } from '@codelab/frontend/abstract/application'
import type {
  IPrimitiveTypeModel,
  IRootDomainStore,
} from '@codelab/frontend/abstract/domain'
import { chance } from '@codelab/frontend/domain/shared'
import { PrimitiveTypeKind, TypeKind } from '@codelab/shared/abstract/codegen'
import {
  type IPrimitiveTypeDTO,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

export const PrimitiveTypeTestFactory = (
  rootStore: Partial<IRootDomainStore>,
) =>
  Factory.define<IPrimitiveTypeModel, IPrimitiveTypeDTO>(
    ({ transientParams }) => {
      const dto: IPrimitiveTypeDTO = {
        __typename: ITypeKind.PrimitiveType as const,
        id: transientParams.id ?? v4(),
        kind: ITypeKind.PrimitiveType,
        name: transientParams.name ?? chance.word({ capitalize: true }),
        primitiveKind:
          transientParams.primitiveKind ?? PrimitiveTypeKind.String,
      }

      const model = rootStore.typeDomainService?.hydrate(
        dto,
      ) as IPrimitiveTypeModel

      return model!
    },
  )
