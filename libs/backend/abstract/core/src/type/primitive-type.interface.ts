import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { EntitySchema } from '@codelab/shared/abstract/types'
import { z } from 'zod'
import { UserRefSchema, UserSchema } from '../user.interface'
import { BaseTypeSchema } from './type.interface'

const PrimitiveTypeSchema = BaseTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.PrimitiveType}`).optional(),
  // kind: z.literal(ITypeKind.PrimitiveType),
  primitiveKind: z.nativeEnum(IPrimitiveTypeKind),
})

// Used for create as well
export type IPrimitiveType = z.infer<typeof PrimitiveTypeSchema>

const PrimitiveTypeExportSchema = PrimitiveTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.PrimitiveType}`),
})

export type IPrimitiveTypeExport = z.infer<typeof PrimitiveTypeExportSchema>
