import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import { ExportDtoSchema, IExportDto } from './export.dto.interface'

export const ImportDtoSchema = Type.Pick(ExportDtoSchema, ['adminDataPath'])

export type IImportDto = Static<typeof ImportDtoSchema>

export const importDtoDefault = Value.Create(ImportDtoSchema)
