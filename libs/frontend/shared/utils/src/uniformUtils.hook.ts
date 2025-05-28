import type { SubmitController } from '@codelab/frontend-abstract-types'
import type { Maybe, Nullish, ObjectLike } from '@codelab/shared-abstract-types'
import type { TSchema } from '@sinclair/typebox'
import type { JSONSchemaType, Schema } from 'ajv'
import type { RefObject } from 'react'

import JSONSchemaBridge from 'uniforms-bridge-json-schema'

import { ajv } from './ajv'

export const connectUniformSubmitRef =
  (submitRef: Maybe<RefObject<Maybe<SubmitController>>>) =>
  (ref: Nullish<{ submit(): unknown; validate(): unknown }>) => {
    if (submitRef && ref) {
      submitRef.current = {
        submit: () => ref.submit(),
        validate: () => ref.validate(),
      }
    }
  }

export const createValidator = (schema: Schema) => {
  const validator = ajv.compile(schema)

  return (model: ObjectLike) => {
    validator(model)

    return validator.errors?.length ? { details: validator.errors } : null
  }
}

export const createBridge = <T extends UnknownObject>(
  schema: JSONSchemaType<T> | TSchema,
) => {
  const validator = createValidator(schema)
  const bridge = new JSONSchemaBridge({ schema, validator })

  return bridge
}
