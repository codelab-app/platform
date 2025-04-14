/**
 * This is not a schema concept, but rather a higher level concept that contains all the data required to represent an API.
 *
 * Interface types is the top level entry to types, and Store/Component all contain them.
 *
 * Interface types contain fields, which could then be nested interface type and so forth.
 *
 * This recursive relationship makes it difficult to represent, so we FLATTEN them into this concept
 *
 * They are ordered from the leaf to the root, since that is the dependent order
 */

import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { omitOwner, TypeDtoWithoutOwnerSchema } from '../type.io.interface'
import { InterfaceTypeSchema } from './interface-type.model.interface'

export const ApiAggregateSchema = Type.Composite([
  Type.Object({
    types: Type.Array(TypeDtoWithoutOwnerSchema),
  }),
  omitOwner(InterfaceTypeSchema),
])

export type IApiAggregate = Static<typeof ApiAggregateSchema>
