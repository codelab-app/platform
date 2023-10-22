import { isUnionSchema } from './schema/is-union'
import { Nullish } from './types/nullish'
import { OmitOwner } from './types/omit-owner'
import { Overwrite } from './types/overwrite'
import { RequireTypename } from './types/require-typename'
import { Serialized } from './types/serialized'
import { NestedValidator } from './validator/nested-validator'
import { validateAndClean } from './validator/validate'
import { values } from './values/default-values'

const Typebox = {
  isUnionSchema,
  NestedValidator,
  Nullish,
  OmitOwner,
  Overwrite,
  Serialized,
  ValidateAndClean: validateAndClean,
  Values: values,
}

export { Typebox }
