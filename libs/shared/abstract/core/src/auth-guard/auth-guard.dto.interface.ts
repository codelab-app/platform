import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { PropDtoSchema, PropSchema } from '../prop/prop.dto.interface'

export const AuthGuardDtoSchema = Type.Object({
  config: PropDtoSchema,
  id: Type.String(),
  name: Type.String(),
  resource: Typebox.Ref,
  responseTransformer: Type.String(),
})

export type IAuthGuardDto = Static<typeof AuthGuardDtoSchema>

export const AuthGuardSchema = Typebox.Overwrite(
  AuthGuardDtoSchema,
  Type.Object({
    config: PropSchema,
  }),
)

export type IAuthGuard = Static<typeof AuthGuardSchema>
