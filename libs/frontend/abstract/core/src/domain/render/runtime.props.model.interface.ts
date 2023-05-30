import type { Maybe } from '@graphql-tools/utils'
import type { Ref } from 'mobx-keystone'
import type { IComponent } from '../component'
import type { IElement } from '../element'
import type { IPageNode } from '../page'
import type { IPropData } from '../prop/prop.model.interface'
import type { TypedProp } from '../type'
import type { IBaseRenderPipe } from '.'

/**
 * Transforms a typed prop to a specific value
 */
export interface ITypedPropTransformer extends IBaseRenderPipe {
  transform(prop: TypedProp, node: IPageNode): unknown
}

export interface IRuntimeProp<T extends IPageNode> {
  /**
   * Final output after rendering typedProps
   */
  evaluatedProps: IPropData
  /**
   * Props after applying `propTransformationJs` and substituting state expression
   * used for validation by PropsInspector
   */
  evaluatedPropsBeforeRender: IPropData
  /**
   * Props evaluation context (state + parent props)
   */
  evaluationContext: IPropData
  /**
   * Ref for node that holds the props either element or component
   */
  nodeRef: Ref<T>
  /**
   * Props in initial state before any transformation
   */
  props: IPropData
}

export type IElementRuntimeProp = IRuntimeProp<IElement>
export interface IComponentRuntimeProp extends IRuntimeProp<IComponent> {
  /**
   * merge component.props evaluation with instance element props evaluation
   */
  componentEvaluatedProps: IPropData

  /**
   * Runtime props for component instance
   */
  instanceElementProps: Maybe<IElementRuntimeProp>
}
