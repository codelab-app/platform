import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { ElementSchema } from '../element'
import { StoreAggregateSchema } from '../store'
import { PageSchema } from './page.model.interface'

export const PageAggregateSchema = Type.Object({
  elements: Type.Array(ElementSchema),
  page: PageSchema,
  store: StoreAggregateSchema,
})

export type IPageAggregate = Static<typeof PageAggregateSchema>
