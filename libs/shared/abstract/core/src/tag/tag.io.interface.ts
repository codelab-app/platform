import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { TagDtoSchema } from './tag.dto.interface'

export const TagExportSchema = Type.Omit(TagDtoSchema, ['owner'])

export type ITagExport = Static<typeof TagExportSchema>
