import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/infra/typebox'
import { Type } from '@sinclair/typebox'

export const StoreDtoSchema = Type.Object({
  actions: Type.Optional(Type.Array(Typebox.RefSchema)),
  api: Typebox.RefSchema,
  component: Typebox.Nullish(Typebox.RefSchema),
  id: Type.String(),
  name: Type.String(),
  page: Typebox.Nullish(Typebox.RefSchema),
  source: Typebox.Nullish(Typebox.RefSchema),
})

export type IStoreDto = Static<typeof StoreDtoSchema>
