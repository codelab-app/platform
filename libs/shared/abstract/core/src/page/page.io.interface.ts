import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { ElementExportSchema, ElementSchema } from '../element'
import { StoreExportSchema, StoreImportSchema } from '../store'
import { PageSchema } from './page.model.interface'

export const PageExportSchema = Type.Object({
  elements: Type.Array(ElementExportSchema),
  page: PageSchema,
  store: StoreExportSchema,
})

export type IPageExport = Static<typeof PageExportSchema>

export const PageImportSchema = Type.Object({
  elements: Type.Array(ElementExportSchema),
  page: PageSchema,
  store: StoreImportSchema,
})

export type IPageImport = Static<typeof PageImportSchema>
