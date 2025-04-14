import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { ApiAggregateSchema, omitOwner } from '../type'
import { AtomSchema } from './atom.model.interface'

/**
 * Aggregate is used to group data together, not 1-to-1 mapping to models
 */
export const AtomAggregateSchema = Type.Object({
  api: ApiAggregateSchema,
  atom: omitOwner(AtomSchema),
})

export type IAtomAggregate = Static<typeof AtomAggregateSchema>
