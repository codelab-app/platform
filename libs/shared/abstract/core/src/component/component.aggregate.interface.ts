import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { ElementDtoSchema } from '../element'
import { StoreAggregateSchema } from '../store'
import { ApiAggregateSchema, omitOwner } from '../type'
import { ComponentDtoSchema } from './component.dto.interface'

export const ComponentAggregateSchema = Type.Object({
  api: ApiAggregateSchema,
  component: omitOwner(ComponentDtoSchema),
  elements: Type.Array(ElementDtoSchema),
  store: StoreAggregateSchema,
})

export type IComponentAggregate = Static<typeof ComponentAggregateSchema>
