import type { TypedProp } from '@codelab/frontend/abstract/domain'
import type { IBaseRenderPipe } from './render.interface'
import type { IRuntimePageNode } from './runtime.model.interface'

/**
 * Transforms a typed prop to a specific value
 */
export interface ITypedPropTransformer extends IBaseRenderPipe {
  transform(
    prop: TypedProp,
    key: string,
    runtimeNode: IRuntimePageNode,
  ): unknown
}
