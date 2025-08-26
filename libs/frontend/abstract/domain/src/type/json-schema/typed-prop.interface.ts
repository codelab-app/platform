import type { IPropData, ITypeKind } from '@codelab/shared-abstract-core'
import type { Maybe } from '@codelab/shared-abstract-types'

import { isPlainObject } from 'remeda'

/**
 * Used to represent a value that has a specific type.
 * Useful for handling the same value in a different way
 * depending on its selected Type.
 *
 * Example: React Node Type and Render Props Type both represent
 * an element id, but they are hydrated in different ways in the render pipeline.
 */
export interface TypedProp {
  // serves as a discriminator, as some atoms may have the same attributes `kind` `type` and `value`
  __isTypedProp: true
  // sometimes we need to know the kind without having to load the type
  kind: ITypeKind
  type: string
  // required for nested types
  value?: unknown | TypedProp
}

export const typedProp = (input: {
  kind: ITypeKind
  type: string
  value?: number | string
}): TypedProp => ({
  ...input,
  __isTypedProp: true,
})

/**
 * Tells us whether this JSON data is representing a `TypedProp`
 */
export const isTypedProp = (prop: IPropData): prop is TypedProp =>
  isPlainObject(prop) && prop.__isTypedProp

export const extractTypedPropValue = (prop: TypedProp): Maybe<unknown> =>
  prop.value && isTypedProp(prop.value)
    ? extractTypedPropValue(prop.value)
    : prop.value
