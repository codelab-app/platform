import type { ObjectMap, Ref } from 'mobx-keystone'
import type { IElement } from '../element'
import type { IPropData } from '../prop'
import type { IBaseRenderPipe } from '../render'
import type { TypedProp } from '../type'

/**
 * Transforms a typed prop to a specific value
 */
export interface ITypedPropTransformer extends IBaseRenderPipe {
  transform(prop: TypedProp, element: IElement): unknown
}

export interface IRendererProps {
  element: Ref<IElement>
  evaluatedProps: IPropData
  extraProps: IPropData
  props: IPropData
  typedPropTransformers: ObjectMap<ITypedPropTransformer>
}
