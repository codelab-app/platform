import { PrimitiveTypeKind, TypeKind } from '@codelab/shared/abstract/codegen'
import type { IPrimitiveTypeDTO } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'
import { createTestRootStore } from '../setup/test-root-store'
import chance from './chance'

export default Factory.define<IPrimitiveTypeDTO>(({ params }) => {
  const dto = {
    __typename: TypeKind.PrimitiveType as 'PrimitiveType',
    id: params.id ?? v4(),
    kind: TypeKind.PrimitiveType,
    name: params.name ?? chance.word({ capitalize: true }),
    primitiveKind: params.primitiveKind ?? PrimitiveTypeKind.String,
  }

  createTestRootStore().typeService.typeDomainService.add(dto)

  return dto
})
