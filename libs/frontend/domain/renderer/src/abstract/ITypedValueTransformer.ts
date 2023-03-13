import type {
  IBaseRenderPipe,
  IComponentService,
  IElementService,
  TypedValue,
} from '@codelab/frontend/abstract/core'
import type { ITypeKind } from '@codelab/shared/abstract/core'

/**
 * Transforms a typed value prop to a specific value
 */
export interface ITypedValueTransformer extends IBaseRenderPipe {
  elementService: IElementService
  componentService: IComponentService
  canHandleTypeKind(typeKind: ITypeKind): boolean
  canHandleValue(value: TypedValue<unknown>): boolean
  // TODO: Create better typing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(typedValue: TypedValue<unknown>, typeKind: ITypeKind): any
}
