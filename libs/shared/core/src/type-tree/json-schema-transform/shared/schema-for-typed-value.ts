import { Maybe } from '@codelab/shared/abstract/types'
import { blankUniforms } from './uniforms-utils'

/**
 * Produces the properties with the shape of a {@link TypedValue}
 * with a `type` field that has a value of `typeId`
 */
export const schemaForTypedValue = (
  typeId: Maybe<string>,
  valueSchema: Record<string, any>,
  typeLabel: Maybe<string>,
) => {
  return {
    value: valueSchema,
    type: {
      type: 'string',
      uniforms: blankUniforms,
      label: typeLabel,
      default: typeId,
      enum: [typeId], // This ensures that only this exact type is considered valid. Allows union types to use oneOf
    },
  }
}
