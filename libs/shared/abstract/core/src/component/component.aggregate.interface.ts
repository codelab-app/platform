import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import {
  CreateElementDtoSchema,
  ICreateElementDto,
} from '../element/element.dto.interface'
import { IStoreAggregate, StoreAggregateSchema } from '../store'
import { ApiSchema, IApi } from '../type'
import { ComponentSchema, IComponent } from './component.dto.interface'

export const ComponentAggregateSchema = Type.Object({
  api: ApiSchema,
  component: ComponentSchema,
  elements: Type.Array(CreateElementDtoSchema),
  store: StoreAggregateSchema,
})

export type IComponentAggregate = Static<typeof ComponentAggregateSchema>
