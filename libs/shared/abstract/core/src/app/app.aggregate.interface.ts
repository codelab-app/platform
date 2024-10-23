import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { ComponentAggregateSchema } from '../component'
import { PageAggregateSchema } from '../page'
import { ResourceSchema } from '../resource/resource.dto.interface'
import { AppSchema } from './app.model.interface'

export const AppAggregateSchema = Type.Object({
  app: AppSchema,
  components: Type.Array(ComponentAggregateSchema),
  pages: Type.Array(PageAggregateSchema),
  resources: Type.Array(ResourceSchema),
})

export type IAppAggregate = Static<typeof AppAggregateSchema>
