import type { IPageNode, TypedProp } from '@codelab/frontend/abstract/domain'
import type { IPropData } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { IBaseRenderPipe } from './render.interface'
import type { IRuntimeElementModel } from './runtime-element.model.interface'

/**
 * Transforms a typed prop to a specific value
 */
export interface ITypedPropTransformer extends IBaseRenderPipe {
  transform(prop: TypedProp, node: IPageNode): unknown
}

export type IRuntimeNode = IRuntimeComponent | IRuntimeElementModel

export interface IRuntimeBase<T extends IPageNode> {
  /**
   * Final output after rendering typedProps
   */
  evaluatedProps: IPropData
  /**
   * Props after substituting state expression used for form validation
   */
  evaluatedPropsBeforeRender: IPropData
  /**
   * Ref for node that holds the props either element or component
   */
  nodeRef: Ref<T>
  /**
   * Props in initial state before any transformation
   */
  props: IPropData
}
