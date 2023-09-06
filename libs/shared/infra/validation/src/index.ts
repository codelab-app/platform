import { isUnionSchema } from './schema/is-union'
import { Nullish } from './types/nullish'
import { OmitOwner } from './types/omit-owner'
import { validateAndClean } from './validate'

const Typebox = {
  isUnionSchema,
  Nullish,
  OmitOwner,
  ValidateAndClean: validateAndClean,
}

export { Typebox }
