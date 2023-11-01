import type {
  IElementModel,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import type { IPropData } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeBase, RendererType } from '../renderer'
import type { IRuntimeStore } from '../store'
import type { IRuntimeProp } from './runtime-prop.model.interface'

export interface IEvaluationContext {
  actions: IPropData
  args?: Array<unknown>
  componentProps: IPropData
  props: IPropData
  refs: IPropData
  rendererType?: RendererType
  rootActions: IPropData
  rootRefs: IPropData
  rootState: IPropData
  state: IPropData
  url: IPropData
}

export interface IRuntimeElementDto {
  node: IElementModel
  store: IStoreModel
}

export interface IPropPipeOutput {
  props: IPropData
}

/**
 * A list of props that get bound to the element
 */
export interface IPropPipe {
  next?: IPropPipe

  merge(element: IRuntimeElement): IPropPipeOutput
}

export interface IRuntimeElement {
  element: IElementModel
  elementRef: Ref<IElementModel>
  /**
   * Evaluated childMapperPropKey based on the state and props
   */
  evaluatedChildMapperProp: Array<unknown>
  /**
   * Final output after rendering typedProps
   */
  evaluatedProps: IPropData
  /**
   * Props after substituting state expression used for form validation
   */
  evaluatedPropsBeforeRender: IPropData
  /**
   * The props used for evaluating expressions, which includes `evaluatedProps`
   */
  expressionEvaluationContext: IEvaluationContext
  /**
   * Props in initial state before any transformation
   */
  props: IPropData
  /**
   * This is the evaluation context for props
   */
  propsEvaluationContext: IEvaluationContext
  runtimeStore: IRuntimeStore
}
