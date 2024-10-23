import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

export const PropSchema = Type.Object({
  // api: Typebox.Nullish(IEntity),
  data: Type.Any(),
  id: Type.String(),
})

export type IProp = Static<typeof PropSchema>
