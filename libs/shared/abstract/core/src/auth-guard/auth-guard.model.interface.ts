import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { PropSchema } from '../prop'
import { AuthGuardDtoSchema } from './auth-guard.dto.interface'

export const AuthGuardSchema = Type.Object({
  ...AuthGuardDtoSchema.properties,
  config: PropSchema,
})

export type IAuthGuard = Static<typeof AuthGuardSchema>
