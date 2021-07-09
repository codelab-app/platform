import { PrimitiveKind } from '@codelab/codegen/dgraph'
import { registerEnumType } from '@nestjs/graphql'
import { z } from 'zod'

export { PrimitiveKind }

export const primitiveKindSchema = z.nativeEnum(PrimitiveKind)

registerEnumType(PrimitiveKind, {
  name: 'PrimitiveKind',
})
