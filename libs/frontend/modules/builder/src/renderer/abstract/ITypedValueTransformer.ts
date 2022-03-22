import { TypedValue, TypeKind } from '@codelab/shared/abstract/core'

/**
 * Transforms a typed value prop to a specific value
 */
export interface ITypedValueTransformer {
  canHandleTypeKind(typeKind: TypeKind): boolean
  canHandleValue(value: TypedValue<any>): boolean
  transform(typedValue: TypedValue<any>, typeKind: TypeKind): any
}
