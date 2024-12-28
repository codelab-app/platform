import type { TKind } from '@sinclair/typebox'

import { Kind, Type } from '@sinclair/typebox'

export const TDefined: TKind = {
  [Kind]: '@codelab/Defined',
}

export const DefinedSchema = Type.Not(
  Type.Union([Type.Null(), Type.Undefined()]),
)
