import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

export const ExportDtoSchema = Type.Object({
  adminDataPath: Type.String({
    default: './data/export-v3',
  }),
  download: Type.Optional(
    Type.Boolean({
      default: false,
      // description: 'Saves to codebase if not downloading',
    }),
  ),
  // includeAdminData: Type.Optional(Type.Boolean({ default: true })),
  // includeUserData: Type.Optional(Type.Boolean()),
  // userDataPath: Type.Optional(Type.String()),
})

export type IExportDto = Static<typeof ExportDtoSchema>

export const exportDtoDefault = Value.Create(ExportDtoSchema)
