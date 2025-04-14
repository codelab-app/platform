import { type Static, Type } from '@sinclair/typebox'

import { ActionSchema } from '../action'
import { ApiAggregateSchema } from '../type'
import { StoreSchema } from './store.model.interface'

export const StoreAggregateSchema = Type.Object({
  actions: Type.Array(ActionSchema),
  api: ApiAggregateSchema,
  store: StoreSchema,
})

export type IStoreAggregate = Static<typeof StoreAggregateSchema>
