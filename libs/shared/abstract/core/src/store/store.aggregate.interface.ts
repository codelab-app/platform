import { type Static, Type } from '@sinclair/typebox'

import { ActionSchema } from '../action'
import { ApiExportSchema, ApiImportSchema } from '../type'
import { StoreSchema } from './store.model.interface'

export const StoreAggregateExportSchema = Type.Object({
  actions: Type.Array(ActionSchema),
  api: ApiExportSchema,
  store: Type.Omit(StoreSchema, ['component', 'page', 'source']),
})

export type IStoreAggregateExport = Static<typeof StoreAggregateExportSchema>

export const StoreAggregateImportSchema = Type.Object({
  actions: Type.Array(ActionSchema),
  api: ApiImportSchema,
  store: StoreSchema,
})

export type IStoreAggregateImport = Static<typeof StoreAggregateImportSchema>
