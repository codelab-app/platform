import { Type } from '@sinclair/typebox'

export const ExactlyOneSchema = Type.Array(Type.Any(), {
  maxItems: 1,
  minItems: 1,
})
