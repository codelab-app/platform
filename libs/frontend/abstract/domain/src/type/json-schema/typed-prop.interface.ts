import type { IPropData } from '@codelab/shared-abstract-core'
import type { Maybe } from '@codelab/shared-abstract-types'

import { ITypeKind } from '@codelab/shared-abstract-core'
import { isPlainObject, isString } from 'remeda'

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
  // required for nested types
  value?: string | TypedProp
}

/**
 * Tells us whether this JSON data is representing a `TypedProp`
 */
export const isTypedProp = (prop: IPropData): prop is TypedProp => {
  if (!isPlainObject(prop)) {
    return false
  }

  const keysLength = Object.keys(prop).length
  const hasType = 'type' in prop && isString(prop['type'])
  const hasKind = 'kind' in prop && prop['kind'] in ITypeKind
  const hasValue = 'value' in prop
  const hasTypeAndKindOnly = hasType && hasKind && keysLength === 2
  const hasAllKeys = hasKind && hasType && hasValue && keysLength === 3

  // This condition reduces the chances of falsely identifying a prop from an atom component
  // that has an actual `type`, `kind`, or `value` field but is not a render prop.
  return hasTypeAndKindOnly || hasAllKeys
}

export const extractTypedPropValue = (prop: TypedProp): Maybe<string> => {
  if (!prop.value) {
    return undefined
  }

  if (isString(prop.value)) {
    return prop.value
  }

  return extractTypedPropValue(prop.value)
}
