import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { ApiExportSchema, ApiImportSchema } from '../type'
import { AtomSchema } from './atom.model.interface'

/**
 * Aggregate is used to group data together, not 1-to-1 mapping to models
 */
export const AtomExportSchema = Type.Object({
  api: ApiExportSchema,
  atom: Type.Omit(AtomSchema, ['owner']),
})

export type IAtomExport = Static<typeof AtomExportSchema>

export const AtomImportSchema = Type.Object({
  api: ApiImportSchema,
  atom: AtomSchema,
})

export type IAtomImport = Static<typeof AtomImportSchema>
