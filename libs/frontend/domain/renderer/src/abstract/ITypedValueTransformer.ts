import { IBaseRenderPipe, TypedValue } from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'

/**
 * Transforms a typed value prop to a specific value
 */
export interface ITypedValueTransformer extends IBaseRenderPipe {
  canHandleTypeKind(typeKind: ITypeKind): boolean
  canHandleValue(value: TypedValue<unknown>): boolean
  transform(typedValue: TypedValue<unknown>, typeKind: ITypeKind): unknown
}
