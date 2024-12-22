import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/infra/typebox'
import { Type } from '@sinclair/typebox'

import { StoreDtoSchema } from './store.dto.interface'

export const StoreSchema = Type.Object({
  ...StoreDtoSchema.properties,
  actions: Type.Array(Typebox.Ref),
  api: Typebox.Ref,
})
export type IStore = Static<typeof StoreSchema>
