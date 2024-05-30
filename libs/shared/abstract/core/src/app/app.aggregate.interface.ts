import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ComponentAggregateSchema, IComponentAggregate } from '../component'
import { IPageAggregate, PageAggregateSchema } from '../page'
import { IResource, ResourceSchema } from '../resource/resource.dto.interface'
import { AppSchema, IApp } from './app.dto.interface'

export const AppAggregateSchema = Type.Object({
  app: AppSchema,
  components: Type.Array(ComponentAggregateSchema),
  pages: Type.Array(PageAggregateSchema),
  resources: Type.Array(ResourceSchema),
})

export type IAppAggregate = Static<typeof AppAggregateSchema>
