import type { TKind } from '@sinclair/typebox'
import { Kind, Type } from '@sinclair/typebox'

export const TAllOrNone = {
  [Kind]: '@codelab/AllOrNone',
} as TKind

export const AllOrNoneSchema = Type.Union([
  Type.Array(Type.Undefined()),
  Type.Array(Type.Not(Type.Undefined())),
])
