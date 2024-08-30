import type { TKind } from '@sinclair/typebox'
import { Kind, Type } from '@sinclair/typebox'

export const TDefined = {
  [Kind]: '@codelab/Defined',
} as TKind

export const DefinedSchema = Type.Not(
  Type.Union([Type.Null(), Type.Undefined()]),
)
