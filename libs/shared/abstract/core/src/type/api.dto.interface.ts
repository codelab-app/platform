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
import { FieldSchema, IField } from '../field/field.dto.interface'
import { IType, TypeSchema } from './type.dto.interface'

export const ApiSchema = Type.Object({
  fields: Type.Array(FieldSchema),
  // This refers to the root interface type
  id: Type.String(),
  types: Type.Array(TypeSchema),
})

export type IApi = Static<typeof ApiSchema>
