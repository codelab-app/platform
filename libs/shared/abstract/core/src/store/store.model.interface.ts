import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/abstract/typebox'
import { Type } from '@sinclair/typebox'

import { ActionSchema } from '../action'
import { StoreDtoSchema } from './store.dto.interface'

export const StoreSchema = Type.Object({
  ...StoreDtoSchema.properties,
  actions: Type.Array(Typebox.Ref),
  api: Typebox.Ref,
})
export type IStore = Static<typeof StoreSchema>
