import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { ElementDtoSchema } from '../element'
import {
  StoreAggregateExportSchema,
  StoreAggregateImportSchema,
} from '../store'
import { ApiExportSchema, ApiImportSchema } from '../type'
import { ComponentDtoSchema } from './component.dto.interface'

export const ComponentAggregateExportSchema = Type.Object({
  api: ApiExportSchema,
  component: Type.Omit(ComponentDtoSchema, ['owner']),
  elements: Type.Array(ElementDtoSchema),
  store: StoreAggregateExportSchema,
})

export type IComponentAggregateExport = Static<
  typeof ComponentAggregateExportSchema
>

export const ComponentAggregateImportSchema = Type.Object({
  api: ApiImportSchema,
  component: ComponentDtoSchema,
  elements: Type.Array(ElementDtoSchema),
  store: StoreAggregateImportSchema,
})

export type IComponentAggregateImport = Static<
  typeof ComponentAggregateImportSchema
>
