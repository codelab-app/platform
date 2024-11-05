import { type Static, Type } from '@sinclair/typebox'

import { ActionSchema } from '../action'
import { ApiExportSchema, ApiImportSchema } from '../type'
import { StoreSchema } from './store.model.interface'

export const StoreExportSchema = Type.Object({
  actions: Type.Array(ActionSchema),
  api: ApiExportSchema,
  store: StoreSchema,
})

export type IStoreExport = Static<typeof StoreExportSchema>

export const StoreImportSchema = Type.Object({
  actions: Type.Array(ActionSchema),
  api: ApiImportSchema,
  store: StoreSchema,
})

export type IStoreImport = Static<typeof StoreImportSchema>
