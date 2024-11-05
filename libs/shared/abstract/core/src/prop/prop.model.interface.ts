import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

export const PropSchema = Type.Object({
  // api: Typebox.Nullish(IEntity),
  // Sync with dto since some nested may need to match for extending
  data: Type.Object({}, { additionalProperties: true }),
  id: Type.String(),
})

export type IProp = Static<typeof PropSchema>
