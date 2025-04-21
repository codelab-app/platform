import { type Static, Type } from '@sinclair/typebox'

import { ActionSchema } from '../action'
import { ApiAggregateSchema } from '../type'
import { StoreDtoSchema } from './store.dto.interface'

export const StoreAggregateSchema = Type.Object({
  actions: Type.Array(ActionSchema),
  api: ApiAggregateSchema,
  store: Type.Omit(StoreDtoSchema, ['component', 'page', 'actions']),
})

export type IStoreAggregate = Static<typeof StoreAggregateSchema>
