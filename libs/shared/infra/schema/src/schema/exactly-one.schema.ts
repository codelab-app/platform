import { Kind, type TKind, Type } from '@sinclair/typebox'

export const TExactlyOne = {
  [Kind]: '@codelab/ExactlyOne',
} as TKind
export const ExactlyOneSchema = Type.Array(Type.Any(), {
  maxItems: 1,
  minItems: 1,
})
