/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  IBaseRenderPipe,
  IComponentService,
  IElementService,
  IPropData,
  TypedValue,
} from '@codelab/frontend/abstract/core'
import type { ITypeKind } from '@codelab/shared/abstract/core'

/**
 * Transforms a typed value prop to a specific value
 */
export interface ITypedValueTransformer extends IBaseRenderPipe {
  componentService: IComponentService
  elementService: IElementService

  canHandleTypeKind(typeKind: ITypeKind): boolean
  canHandleValue(value: TypedValue<unknown>): boolean
  // TODO: Create better typing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(typedValue: TypedValue<unknown>): any
}
