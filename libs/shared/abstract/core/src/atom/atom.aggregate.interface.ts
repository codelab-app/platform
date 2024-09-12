import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ApiExportSchema, ApiSchema } from '../type'
import { AtomSchema } from './atom.dto.interface'

/**
 * Aggregate is used to group data together, not 1-to-1 mapping to models
 */
export const AtomAggregateSchema = Type.Object({
  api: ApiExportSchema,
  atom: AtomSchema,
})

export type IAtomAggregate = Static<typeof AtomAggregateSchema>
