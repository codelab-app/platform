import { Kind, type TKind, Type } from '@sinclair/typebox'

import { DefinedSchema } from './defined.schema'

export const TNone: TKind = {
  [Kind]: '@codelab/None',
}

export const NoneSchema = Type.Array(Type.Not(DefinedSchema))
