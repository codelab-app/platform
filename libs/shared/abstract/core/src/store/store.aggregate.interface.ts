import { type Static, Type } from '@sinclair/typebox'

import { ApiSchema } from '../type'
import { StoreSchema } from './store.model.interface'

export const StoreAggregateSchema = Type.Object({
  api: ApiSchema,
  store: StoreSchema,
})

export type IStoreAggregate = Static<typeof StoreAggregateSchema>
