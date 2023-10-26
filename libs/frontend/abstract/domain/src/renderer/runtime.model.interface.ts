import type { IPropData } from '@codelab/shared/abstract/core'
import type { Maybe } from '@graphql-tools/utils'
import type { Ref } from 'mobx-keystone'
import type { IComponentModel } from '../component'
import type { IElementModel, IEvaluationContext } from '../element'
import type { IPageNode } from '../page'
import type { IElementTreeViewDataNode } from '../shared'
import type { TypedProp } from '../type'
import type { IBaseRenderPipe } from '.'

/**
 * Transforms a typed prop to a specific value
 */
export interface ITypedPropTransformer extends IBaseRenderPipe {
  transform(prop: TypedProp, node: IPageNode): unknown
}

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

export interface IRuntimeElement extends IRuntimeBase<IElementModel> {
  /**
   * Evaluated childMapperPropKey based on the state and props
   */
  evaluatedChildMapperProp: Array<unknown>

  /**
   * Used for expressions evaluation
   */
  expressionEvaluationContext: IEvaluationContext

  /**
   * Same as expressionEvaluationContext but without props
   */
  propsEvaluationContext: IEvaluationContext
  urlProps?: IPropData
}

export interface IRuntimeComponent extends IRuntimeBase<IComponentModel> {
  /**
   * merge component.props evaluation with instance element props evaluation
   */
  componentEvaluatedProps: IPropData

  /**
   * Runtime props for component instance
   */
  instanceElementProps: Maybe<IRuntimeElement>
}
