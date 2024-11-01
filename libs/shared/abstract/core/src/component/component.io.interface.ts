import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { ElementDtoSchema } from '../element'
import { StoreExportSchema, StoreImportSchema } from '../store'
import { ApiExportSchema, ApiImportSchema } from '../type'
import { ComponentDtoSchema } from './component.dto.interface'

export const ComponentExportSchema = Type.Object({
  api: ApiExportSchema,
  component: ComponentDtoSchema,
  elements: Type.Array(ElementDtoSchema),
  store: StoreExportSchema,
})

export type IComponentExport = Static<typeof ComponentExportSchema>

export const ComponentImportSchema = Type.Object({
  api: ApiImportSchema,
  component: ComponentDtoSchema,
  elements: Type.Array(ElementDtoSchema),
  store: StoreImportSchema,
})

export type IComponentImport = Static<typeof ComponentImportSchema>
