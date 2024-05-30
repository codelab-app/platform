import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ElementSchema, IElement } from '../element'
import { IStoreAggregate, StoreAggregateSchema } from '../store'
import { IPage, PageSchema } from './page.dto.interface'

export const PageAggregateSchema = Type.Object({
  elements: Type.Array(ElementSchema),
  page: PageSchema,
  store: StoreAggregateSchema,
})

export type IPageAggregate = Static<typeof PageAggregateSchema>
