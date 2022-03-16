import {
  IElementType,
  IReactNodeType,
  IRenderPropsType,
} from '@codelab/shared/abstract/core'
import { schemaForTypedValue } from './schema-for-typed-value'
import { TypeTransformFn } from './types'
import { nullUniforms } from './uniforms-utils'
import { getExtraProperties } from './utils'

type ReactElementType = IElementType | IReactNodeType | IRenderPropsType

/**
 * Handles transformation of the React Element related types.
 * Produces a {@link TypedValue} shaped schema
 */
export const transformReactElementType: TypeTransformFn<ReactElementType> = (
  type,
  options,
) => {
  const extra = getExtraProperties(type, options)

  const properties = schemaForTypedValue(
    type.id,
    {
      type: 'string',
      ...extra,
      label: '',
    },
    '',
  )

  return {
    type: 'object',
    properties,
    uniforms: nullUniforms,
    label: '',
  }
}
