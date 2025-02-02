import type { TSchema } from '@sinclair/typebox'

import { Kind, Type } from '@sinclair/typebox'

export const TDefined = {
  [Kind]: '@codelab/Defined',
} as TSchema

export const DefinedSchema = Type.Not(
  Type.Union([Type.Null(), Type.Undefined()]),
)
