import type { IPropData, ITypeKind } from '@codelab/shared-abstract-core'
import type { Maybe } from '@codelab/shared-abstract-types'

import { isPlainObject, isString } from 'remeda'

export enum PropKind {
  TypedProp = 'typedProp',
  UnionTypeProp = 'unionTypeProp',
}

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
  propKind: PropKind.TypedProp
  type: string
  // required for nested types
  value?: string | PropObject
}

type UnionTypePropValue = {
  [key in ITypeKind]: string | PropObject
}

export interface UnionTypeProp extends UnionTypePropValue {
  // sometimes we need to know the kind without having to load the type
  kind: ITypeKind
  propKind: PropKind.UnionTypeProp
  type: string
}

export type PropObject = TypedProp | UnionTypeProp

/**
 * Tells us whether this JSON data is representing a `TypedProp`
 */
export const isTypedProp = (prop: IPropData): prop is TypedProp =>
  isPlainObject(prop) && prop.propKind === PropKind.TypedProp

export const isUnionTypeProp = (prop: IPropData): prop is UnionTypeProp =>
  isPlainObject(prop) && prop.propKind === PropKind.UnionTypeProp

export const isPropObject = (
  prop: IPropData,
): prop is TypedProp | UnionTypeProp =>
  isTypedProp(prop) || isUnionTypeProp(prop)

export const mapUnionTypePropToTypedProp = (
  prop: UnionTypeProp,
): TypedProp => ({
  kind: prop.kind,
  propKind: PropKind.TypedProp,
  type: prop.type,
  value: prop[prop.kind],
})

export const extractTypedPropValue = (prop: TypedProp): Maybe<string> => {
  if (!prop.value) {
    return undefined
  }

  if (isString(prop.value)) {
    return prop.value
  }

  if (isUnionTypeProp(prop.value)) {
    return extractTypedPropValue(mapUnionTypePropToTypedProp(prop.value))
  }

  return extractTypedPropValue(prop.value)
}
