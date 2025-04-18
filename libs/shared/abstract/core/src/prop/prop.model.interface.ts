import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared-infra-typebox'
import { Type } from '@sinclair/typebox'

export const PropSchema = Type.Object({
  api: Typebox.Nullish(Typebox.RefSchema),
  // Sync with dto since some nested may need to match for extending
  data: Type.Record(Type.String(), Type.Any()),
  id: Type.String(),
})

export type IProp = Static<typeof PropSchema>
