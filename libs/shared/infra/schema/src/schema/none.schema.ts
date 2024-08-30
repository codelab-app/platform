import { Kind, type TKind, Type } from '@sinclair/typebox'

export const TNone = {
  [Kind]: '@codelab/None',
} as TKind

export const NoneSchema = Type.Array(Type.Undefined())
