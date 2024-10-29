import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { ApiExportSchema } from '../type'
import { AtomExportSchema } from './atom.export.interface'
import { AtomSchema } from './atom.model.interface'

/**
 * Aggregate is used to group data together, not 1-to-1 mapping to models
 */
export const AtomAggregateSchema = Type.Object({
  api: ApiExportSchema,
  atom: AtomExportSchema,
})

export type IAtomAggregate = Static<typeof AtomAggregateSchema>
