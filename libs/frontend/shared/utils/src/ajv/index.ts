import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import addKeywords from 'ajv-keywords'

import { clDiscriminatorKeyword } from './cl-discriminator.keyword'
import { errorsKeyword } from './errors.keyword'
import { forbiddenValuesKeyword } from './forbidden-values.keyword'

export const ajv = new Ajv({
  allErrors: true,
  strict: false,
  useDefaults: true,
  discriminator: true,
})

addFormats(ajv)
addKeywords(ajv, ['typeof', 'transform'])

ajv.addKeyword(errorsKeyword)
ajv.addKeyword(clDiscriminatorKeyword)
// we can add custom type definitions here that may be too complex to do in the actual schema
// ajv.addSchema(customTypeSchema)

ajv.addKeyword(forbiddenValuesKeyword)
