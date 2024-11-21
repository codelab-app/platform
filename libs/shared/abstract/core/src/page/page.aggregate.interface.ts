import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { ElementExportSchema, ElementSchema } from '../element'
import {
  StoreAggregateExportSchema,
  StoreAggregateImportSchema,
} from '../store'
import { PageDtoSchema } from './page.dto.interface'

export const PageAggregateExportSchema = Type.Object({
  elements: Type.Array(ElementExportSchema),
  page: PageDtoSchema,
  store: StoreAggregateExportSchema,
})

export type IPageAggregateExport = Static<typeof PageAggregateExportSchema>

export const PageAggregateImportSchema = Type.Object({
  elements: Type.Array(ElementExportSchema),
  page: PageDtoSchema,
  store: StoreAggregateImportSchema,
})

export type IPageAggregateImport = Static<typeof PageAggregateImportSchema>
