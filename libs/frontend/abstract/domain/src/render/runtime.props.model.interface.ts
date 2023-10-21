import type { IPropData } from '@codelab/shared/abstract/core'
import type { Maybe } from '@graphql-tools/utils'
import type { Ref } from 'mobx-keystone'
import type { IComponentModel } from '../component'
import type { IElementModel } from '../element'
import type { IPageNode } from '../page'
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

export interface IElementRuntimeProp extends IRuntimeProp<IElementModel> {
  /**
   * Evaluated childMapperPropKey based on the state and props
   */
  evaluatedChildMapperProp: Array<unknown>
}

export interface IComponentRuntimeProp extends IRuntimeProp<IComponentModel> {
  /**
   * merge component.props evaluation with instance element props evaluation
   */
  componentEvaluatedProps: IPropData

  /**
   * Runtime props for component instance
   */
  instanceElementProps: Maybe<IElementRuntimeProp>
}
