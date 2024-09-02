import type { Nullish } from '@codelab/shared/abstract/types'
import type { TKind } from '@sinclair/typebox'
import { Kind, Type } from '@sinclair/typebox'
import { Validator } from '../validation'
import { DefinedSchema } from './defined.schema'

export const TAtMostOne: TKind = {
  [Kind]: '@codelab/AtMostOne',
}

export const AtMostOneSchema = Type.Array(
  Type.Union([DefinedSchema, Type.Not(DefinedSchema)]),
  {
    validate: (items: Array<Nullish<object> | boolean>) => {
      const truthyCount = items.filter((item) => Boolean(item)).length

      return truthyCount <= 1
    },
  },
)
