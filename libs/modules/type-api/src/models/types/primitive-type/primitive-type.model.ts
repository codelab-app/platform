import { PrimitiveType } from '@codelab/codegen/dgraph'
import { registerEnumType } from '@nestjs/graphql'
import { z } from 'zod'

export { PrimitiveType }

export const primitiveTypeSchema = z.nativeEnum(PrimitiveType)

registerEnumType(PrimitiveType, {
  name: 'PrimitiveType',
})
