import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/abstract/typebox'
import { Type } from '@sinclair/typebox'

import { PropSchema } from '../prop'
import { AuthGuardDtoSchema } from './auth-guard.dto.interface'

export const AuthGuardSchema = Typebox.Overwrite(
  AuthGuardDtoSchema,
  Type.Object({
    config: PropSchema,
  }),
)

export type IAuthGuard = Static<typeof AuthGuardSchema>
