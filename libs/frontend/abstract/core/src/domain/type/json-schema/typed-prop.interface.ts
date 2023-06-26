import { ITypeKind } from '@codelab/shared/abstract/core'
import isPlainObject from 'lodash/isPlainObject'
import isString from 'lodash/isString'
import type { IPropData } from '../../prop'

/**
 * Used to represent a value that has a specific type.
 * Useful for handling the same value in a different way
 * depending on its selected Type.
 *
 * Example: React Node Type and Render Props Type both represent
 * an element id, but they are hydrated in different ways in the render pipeline.
 */
export interface TypedProp {
  // sometimes we need to know the kind without having to load the type
  kind: ITypeKind
  type: string
  value: string
}

export const isTypedProp = (prop: IPropData): prop is TypedProp => {
  return (
    isPlainObject(prop) &&
    'type' in prop &&
    isString(prop['type']) &&
    'kind' in prop &&
    prop['kind'] in ITypeKind
  )
}
