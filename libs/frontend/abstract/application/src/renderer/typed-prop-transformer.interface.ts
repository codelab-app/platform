import type { TypedProp } from '@codelab/frontend/abstract/domain'
import type { IBaseRenderPipe } from './render.interface'
import type { IRuntimeModel } from './runtime.model.interface'

/**
 * Transforms a typed prop to a specific value
 */
export interface ITypedPropTransformer extends IBaseRenderPipe {
  transform(prop: TypedProp, key: string, runtimeNode: IRuntimeModel): unknown
}
