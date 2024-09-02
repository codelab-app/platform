import type { TKind } from '@sinclair/typebox'
import { Kind, Type } from '@sinclair/typebox'
import { DefinedSchema } from './defined.schema'

export const TAllOrNone: TKind = {
  [Kind]: '@codelab/AllOrNone',
}

export const AllOrNoneSchema = Type.Union([
  Type.Array(DefinedSchema),
  Type.Array(Type.Not(DefinedSchema)),
])
