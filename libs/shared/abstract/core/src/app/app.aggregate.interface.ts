import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import {
  ComponentAggregateExportSchema,
  ComponentAggregateImportSchema,
} from '../component'
import { DomainSchema } from '../domain/domain.dto.interface'
import { PageAggregateExportSchema, PageAggregateImportSchema } from '../page'
import { ResourceDtoSchema, ResourceSchema } from '../resource'
import { AppDtoSchema } from './app.dto.interface'

export const AppAggregateExportSchema = Type.Object({
  app: AppDtoSchema,
  components: Type.Array(ComponentAggregateExportSchema),
  domains: Type.Array(DomainSchema),
  pages: Type.Array(PageAggregateExportSchema),
  resources: Type.Array(Type.Omit(ResourceDtoSchema, ['owner'])),
})

export type IAppAggregateExport = Static<typeof AppAggregateExportSchema>

export const AppAggregateImportSchema = Type.Object({
  app: AppDtoSchema,
  components: Type.Array(ComponentAggregateImportSchema),
  domains: Type.Array(DomainSchema),
  pages: Type.Array(PageAggregateImportSchema),
  resources: Type.Array(ResourceDtoSchema),
})

export type IAppAggregateImport = Static<typeof AppAggregateImportSchema>
