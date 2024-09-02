import { Kind, type TKind, Type } from '@sinclair/typebox'

export const TAll: TKind = {
  [Kind]: '@codelab/All',
}
export const AllSchema = Type.Array(Type.Not(Type.Undefined()), { minItems: 1 })
