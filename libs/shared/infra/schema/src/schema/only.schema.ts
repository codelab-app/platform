import type { TKind } from '@sinclair/typebox'
import { Kind, Type } from '@sinclair/typebox'

export const TOnly: TKind = {
  [Kind]: '@codelab/Only',
}

export const OnlySchema = Type.Union([
  Type.Array(Type.Undefined()),
  Type.Array(Type.Not(Type.Undefined())),
])
