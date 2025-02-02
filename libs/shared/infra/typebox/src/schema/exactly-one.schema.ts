import { Kind, type TKind, Type } from '@sinclair/typebox'

import { DefinedSchema } from './defined.schema'

export const TExactlyOne: TKind = {
  [Kind]: '@codelab/ExactlyOne',
}
export const ExactlyOneSchema = Type.Array(Type.Any(), {
  contains: DefinedSchema,
  minContains: 1,
  maxContains: 1,
})
