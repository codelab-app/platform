import { Typebox } from '@codelab/shared/infra/validation'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ExportDto } from './export.dto.interface'

export const ImportDto = Type.Pick(ExportDto, ['adminDataPath'])

export type ImportDto = Static<typeof ImportDto>

export const importDtoDefault = Typebox.Values(ImportDto)
