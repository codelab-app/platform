import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

export const ExportDto = Type.Object({
  // adminDataPath: Type.Optional(Type.String()),
  download: Type.Optional(
    Type.Boolean({
      description: 'Saves to codebase if not downloading',
    }),
  ),
  // includeAdminData: Type.Optional(Type.Boolean({ default: true })),
  // includeUserData: Type.Optional(Type.Boolean()),
  // userDataPath: Type.Optional(Type.String()),
})

export type ExportDto = Static<typeof ExportDto>

export const exportDtoSchema = ExportDto

export const exportDtoDefault = Value.Create(ExportDto)
