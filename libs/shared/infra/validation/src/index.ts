import { isUnionSchema } from './schema/is-union'
import { Nullish } from './types/nullish'
import { OmitOwner } from './types/omit-owner'
import { NestedValidator } from './validator/nested-validator'
import { validateAndClean } from './validator/validate'

const Typebox = {
  isUnionSchema,
  NestedValidator,
  Nullish,
  OmitOwner,
  ValidateAndClean: validateAndClean,
}

export { Typebox }
