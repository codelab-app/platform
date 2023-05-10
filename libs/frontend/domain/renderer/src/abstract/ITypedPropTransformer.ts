import type {
  IBaseRenderPipe,
  IElement,
  TypedProp,
} from '@codelab/frontend/abstract/core'

/**
 * Transforms a typed prop to a specific value
 */
export interface ITypedPropTransformer extends IBaseRenderPipe {
  transform(prop: TypedProp, element: IElement): unknown
}
