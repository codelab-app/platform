import {
  IBaseRenderPipe,
  IComponentService,
  IElementService,
  TypedValue,
} from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'

/**
 * Transforms a typed value prop to a specific value
 */
export interface ITypedValueTransformer extends IBaseRenderPipe {
  canHandleTypeKind(typeKind: ITypeKind): boolean
  canHandleValue(value: TypedValue<unknown>): boolean
  // TODO: Create better typing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(typedValue: TypedValue<unknown>, typeKind: ITypeKind): any

  elementService: IElementService
  componentService: IComponentService
}
