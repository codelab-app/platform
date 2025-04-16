import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared-infra-typebox'
import { Type } from '@sinclair/typebox'

import { OwnerSchema } from '../user'

export const AppDtoSchema = Type.Object({
  ...OwnerSchema.properties,
  domains: Type.Optional(Type.Array(Typebox.RefSchema)),
  id: Type.String(),
  name: Type.String(),
  pages: Type.Optional(Type.Array(Typebox.RefSchema)),
})

export type IAppDto = Static<typeof AppDtoSchema>
