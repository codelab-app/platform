import { isUnionSchema } from './schema/is-union'
import { Nullish } from './types/nullish'
import { OmitOwner } from './types/omit-owner'
import { NestedValidator } from './validator/nested-validator'
import { validateAndClean } from './validator/validate'
import { values } from './values/default-values'

const Typebox = {
  isUnionSchema,
  NestedValidator,
  Nullish,
  OmitOwner,
  ValidateAndClean: validateAndClean,
  Values: values,
}

export { Typebox }
