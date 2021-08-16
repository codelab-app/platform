import { PrimitiveKind } from '@codelab/shared/graph'
import { registerEnumType } from '@nestjs/graphql'
import { z } from 'zod'

/** Zod schema for the {@link PrimitiveKind} enum */
export const primitiveKindSchema = z.nativeEnum(PrimitiveKind)

registerEnumType(PrimitiveKind, {
  name: 'PrimitiveKind',
})
