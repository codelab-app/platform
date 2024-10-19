import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { ElementCreateDtoSchema } from '../element/element.dto.interface'
import { StoreAggregateSchema } from '../store'
import { ApiSchema } from '../type'
import { ComponentSchema } from './component.dto.interface'

export const ComponentAggregateSchema = Type.Object({
  api: ApiSchema,
  component: ComponentSchema,
  elements: Type.Array(ElementCreateDtoSchema),
  store: StoreAggregateSchema,
})

export type IComponentAggregate = Static<typeof ComponentAggregateSchema>
