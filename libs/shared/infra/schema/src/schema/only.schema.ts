import type { TKind } from '@sinclair/typebox'
import { Kind, Type } from '@sinclair/typebox'

export const TOnly = {
  [Kind]: '@codelab/Only',
} as TKind

export const OnlySchema = Type.Union([
  Type.Array(Type.Undefined()),
  Type.Array(Type.Not(Type.Undefined())),
])
