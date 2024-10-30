import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { ElementCreateDtoSchema } from '../element'
import { StoreExportSchema, StoreImportSchema } from '../store'
import { ApiExportSchema, ApiImportSchema } from '../type'
import { ComponentSchema } from './component.dto.interface'

export const ComponentExportSchema = Type.Object({
  api: ApiExportSchema,
  component: ComponentSchema,
  elements: Type.Array(ElementCreateDtoSchema),
  store: StoreExportSchema,
})

export type IComponentExport = Static<typeof ComponentExportSchema>

export const ComponentImportSchema = Type.Object({
  api: ApiImportSchema,
  component: ComponentSchema,
  elements: Type.Array(ElementCreateDtoSchema),
  store: StoreImportSchema,
})

export type IComponentImport = Static<typeof ComponentImportSchema>
