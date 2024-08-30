import type { TKind } from '@sinclair/typebox'
import { Kind, Type } from '@sinclair/typebox'

export const TAtMostOne = {
  [Kind]: '@codelab/AtMostOne',
} as TKind

export const AtMostOneSchema = Type.Array(Type.Any(), { maxItems: 1 })
