import type { Ref } from 'mobx-keystone'
import type { IElement } from '../element'
import type { IPropData } from '../prop/prop.model.interface'
import type { TypedProp } from '../type'
import type { IBaseRenderPipe } from '.'

/**
 * Transforms a typed prop to a specific value
 */
export interface ITypedPropTransformer extends IBaseRenderPipe {
  transform(prop: TypedProp, element: IElement): unknown
}

export interface IRuntimeProp {
  element: Ref<IElement>
  evaluatedProps: IPropData
  props: IPropData
}
