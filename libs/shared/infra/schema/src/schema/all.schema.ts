import { Kind, type TKind, Type } from '@sinclair/typebox'

export const TAll = {
  [Kind]: '@codelab/All',
} as TKind

export const AllSchema = Type.Array(Type.Not(Type.Undefined()), { minItems: 1 })
