import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { IPropData } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeBase, RendererType } from '../renderer'
import type { IRuntimeStore } from '../store'

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
  nodeRef: Ref<IElementModel>
  // store: IRuntimeStore
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
  // props: IPropData
  // propsPipe: Array<IPropPipe>
  runtimeStore: IRuntimeStore
  // /**
  //  * Evaluated childMapperPropKey based on the state and props
  //  */
  // evaluatedChildMapperProp: Array<unknown>

  // /**
  //  * Used for expressions evaluation
  //  */
  // expressionEvaluationContext: IEvaluationContext

  // /**
  //  * Same as expressionEvaluationContext but without props
  //  */
  // propsEvaluationContext: IEvaluationContext
  // urlProps?: IPropData
}
