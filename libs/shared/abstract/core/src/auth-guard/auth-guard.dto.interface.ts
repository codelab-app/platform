import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/infra/typebox'
import { Type } from '@sinclair/typebox'

import { PropDtoSchema } from '../prop/prop.dto.interface'

export const AuthGuardDtoSchema = Type.Object({
  config: PropDtoSchema,
  id: Type.String(),
  name: Type.String(),
  owner: Typebox.RefSchema,
  resource: Typebox.RefSchema,
  responseTransformer: Type.String(),
})

export type IAuthGuardDto = Static<typeof AuthGuardDtoSchema>
