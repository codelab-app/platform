import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { IPropData } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { RendererType } from '../renderer.model.interface'
import type { IRuntimeContainerNodeModel } from '../runtime-container-node'
import type { IRuntimeModel, IRuntimeModelRef } from '../runtime-model'
import type { IRuntimeStoreModel } from '../runtime-store'

export interface IEvaluationContext {
  actions: IPropData
  args?: Array<unknown>
  componentProps: IPropData
  props: IPropData
  refs: IPropData
  rendererType: RendererType
  rootActions: IPropData
  rootRefs: IPropData
  rootState: IPropData
  state: IPropData
  url: IPropData
}

export interface IRuntimeProp {
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
}

export interface IRuntimeElementModel extends IRuntimeProp {
  closestRuntimeContainerNode: IRuntimeContainerNodeModel
  element: IElementModel
  elementRef: Ref<IElementModel>
  parent: IRuntimeModel
  parentRef: IRuntimeModelRef
  runtimeStore: IRuntimeStoreModel
}
