import type { IValidationService } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/build/cjs/value'
import { StandardValidator } from 'typebox-validators'
import type { ValidationOptions } from './options'

const AtLeastOneSchema = Type.Array(
  Type.Union([
    Type.Object({}),
    Type.Boolean(),
    Type.String(),
    Type.Null(),
    Type.Undefined(),
  ]),
  { minItems: 1 },
)

const validator = new StandardValidator(AtLeastOneSchema)

type AtLeastOneType = Static<typeof AtLeastOneSchema>

export const containsAtLeastOne = (items: AtLeastOneType) => {
  return Value.Check(AtLeastOneSchema, items)
}

export const assertContainsAtLeastOne = (
  items: Array<Nullish<object> | boolean | string>,
  options?: ValidationOptions,
) => {
  return validator.assert(items)
}
