import { IBaseRenderPipe, TypedValue } from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'

/**
 * Transforms a typed value prop to a specific value
 */
export interface ITypedValueTransformer extends IBaseRenderPipe {
  canHandleTypeKind(typeKind: ITypeKind): boolean
  canHandleValue(value: TypedValue<any>): boolean
  transform(typedValue: TypedValue<any>, typeKind: ITypeKind): any
}
