import type { IPageNode, TypedProp } from '@codelab/frontend/abstract/domain'
import type { IBaseRenderPipe } from './render.interface'

/**
 * Transforms a typed prop to a specific value
 */
export interface ITypedPropTransformer extends IBaseRenderPipe {
  transform(prop: TypedProp, node: IPageNode): unknown
}
