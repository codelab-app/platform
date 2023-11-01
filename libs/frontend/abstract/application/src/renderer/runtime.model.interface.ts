import type {
  IComponentModel,
  IElementModel,
  IPageNode,
  TypedProp,
} from '@codelab/frontend/abstract/domain'
import type { IPropData } from '@codelab/shared/abstract/core'
import type { Maybe } from '@graphql-tools/utils'
import type { Ref } from 'mobx-keystone'
import type { IBaseRenderPipe } from './render.interface'
import type { IRuntimeComponent } from './runtime-component.model'
import type { IRuntimeElement } from './runtime-element.model.interface'

/**
 * Transforms a typed prop to a specific value
 */
export interface ITypedPropTransformer extends IBaseRenderPipe {
  transform(prop: TypedProp, node: IPageNode): unknown
}

export type IRuntimeNode = IRuntimeComponent | IRuntimeElement

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
