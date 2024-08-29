import type { TKind } from '@sinclair/typebox'
import { Kind, Type } from '@sinclair/typebox'

export const TAtLeastOne = {
  [Kind]: '@codelab/AtLeastOne',
} as TKind

export const AtLeastOneSchema = Type.Array(Type.Any(), { minItems: 1 })
