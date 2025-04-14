import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { ComponentAggregateSchema } from '../component'
import { DomainSchema } from '../domain/domain.dto.interface'
import { PageAggregateSchema } from '../page'
import { ResourceDtoSchema } from '../resource'
import { omitOwner } from '../type'
import { AppDtoSchema } from './app.dto.interface'

export const AppAggregateSchema = Type.Object({
  app: omitOwner(AppDtoSchema),
  components: Type.Array(ComponentAggregateSchema),
  domains: Type.Array(DomainSchema),
  pages: Type.Array(PageAggregateSchema),
  resources: Type.Array(omitOwner(ResourceDtoSchema)),
})

export type IAppAggregate = Static<typeof AppAggregateSchema>
