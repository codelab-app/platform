import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { FieldDtoSchema } from './field.dto.interface'

export const FieldExportSchema = Type.Omit(FieldDtoSchema, ['owner'])

export type IFieldExport = Static<typeof FieldExportSchema>
