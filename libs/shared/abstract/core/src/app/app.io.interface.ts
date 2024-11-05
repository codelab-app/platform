import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { ComponentExportSchema, ComponentImportSchema } from '../component'
import { DomainSchema } from '../domain/domain.dto.interface'
import { PageExportSchema, PageImportSchema } from '../page'
import { ResourceSchema } from '../resource'
import { AppSchema } from './app.model.interface'

export const AppExportSchema = Type.Object({
  app: AppSchema,
  components: Type.Array(ComponentExportSchema),
  domains: Type.Array(DomainSchema),
  pages: Type.Array(PageExportSchema),
  resources: Type.Array(ResourceSchema),
})

export type IAppExport = Static<typeof AppExportSchema>

export const AppImportSchema = Type.Object({
  app: AppSchema,
  components: Type.Array(ComponentImportSchema),
  domains: Type.Array(DomainSchema),
  pages: Type.Array(PageImportSchema),
  resources: Type.Array(ResourceSchema),
})

export type IAppImport = Static<typeof AppImportSchema>
