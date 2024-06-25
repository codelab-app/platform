import { type Static, Type } from '@sinclair/typebox'
import { ApiSchema } from '../type'
import { StoreSchema } from './store.dto.interface'

export const StoreAggregateSchema = Type.Object({
  api: ApiSchema,
  store: StoreSchema,
})

export type IStoreAggregate = Static<typeof StoreAggregateSchema>
