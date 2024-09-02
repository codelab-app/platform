import type { TKind } from '@sinclair/typebox'
import { Kind, Type } from '@sinclair/typebox'
import { DefinedSchema } from './defined.schema'

export const TAtLeastOne: TKind = {
  [Kind]: '@codelab/AtLeastOne',
}

export const AtLeastOneSchema = Type.Array(Type.Any(), {
  contains: DefinedSchema,
  minContains: 1,
})
