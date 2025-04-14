import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/infra/typebox'
import { Type } from '@sinclair/typebox'

import { StoreDtoSchema } from './store.dto.interface'

export const StoreSchema = Type.Composite([
  Type.Omit(StoreDtoSchema, ['component', 'page']),
  Type.Object({
    actions: Type.Array(Typebox.RefSchema),
    api: Typebox.RefSchema,
  }),
])

export type IStore = Static<typeof StoreSchema>
