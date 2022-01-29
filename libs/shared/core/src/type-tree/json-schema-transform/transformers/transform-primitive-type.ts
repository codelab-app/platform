import {
  IPrimitiveType,
  PrimitiveTypeKind,
} from '@codelab/shared/abstract/core'
import { TypeTransformFn } from '../shared/types'
import { getExtraProperties } from '../shared/utils'

/**
 * Converts a {@link PrimitiveTypeKind} to a valid json schema type
 * or throws an Error if the PrimitiveKind is not recognized
 * Handles: string, integer, number and boolean
 */
export const primitiveKindToJsonType = (primitiveKind: PrimitiveTypeKind) => {
  switch (primitiveKind) {
    case PrimitiveTypeKind.String:
      return 'string'
    case PrimitiveTypeKind.Integer:
      return 'integer'
    case PrimitiveTypeKind.Float:
      return 'number'
    case PrimitiveTypeKind.Boolean:
      return 'boolean'
    default:
      throw new Error('Primitive kind not recognized ' + primitiveKind)
  }
}

export const transformPrimitiveType: TypeTransformFn<IPrimitiveType> = (
  type,
  options,
) => {
  const extra = getExtraProperties(type, options)

  return {
    type: primitiveKindToJsonType((type as IPrimitiveType).primitiveKind),
    ...extra,
  }
}
