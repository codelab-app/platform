import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { ElementExportSchema } from '../element'
import { StoreAggregateSchema } from '../store'
import { PageDtoSchema } from './page.dto.interface'

export const PageAggregateSchema = Type.Object({
  elements: Type.Array(ElementExportSchema),
  page: PageDtoSchema,
  store: StoreAggregateSchema,
})

export type IPageAggregate = Static<typeof PageAggregateSchema>
