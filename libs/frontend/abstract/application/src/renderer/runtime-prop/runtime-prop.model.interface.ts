import type {
  IComponentModel,
  IElementModel,
  IPropModel,
} from '@codelab/frontend/abstract/domain'
import type { IPropData } from '@codelab/shared/abstract/core'
import type { ObjectMap } from 'mobx-keystone'
import type { IRuntimeModel } from '../runtime.model.interface'
import type { IRuntimeContainerNodeModel } from '../runtime-container-node'
import type { IRuntimeElementModel } from '../runtime-element'

export interface IEvaluationContext {
  actions: IPropData
  args?: Array<unknown>
  componentProps: IPropData
  props: IPropData
  refs: IPropData
  rootActions: IPropData
  rootRefs: IPropData
  rootState: IPropData
  state: IPropData
  url: IPropData
}

export interface IBaseRuntimeProps {
  /**
   * Final output after rendering typedProps
   */
  evaluatedProps: IPropData
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
  /**
   * Root runtime components/elements for RenderProps, ReactNode, ElementType props
   */
  runtimeRootNodes: ObjectMap<IRuntimeModel>

  addRuntimeComponentModel(
    component: IComponentModel,
  ): IRuntimeContainerNodeModel
  addRuntimeElementModel(element: IElementModel): IRuntimeElementModel
}

export interface IRuntimeComponentPropModel extends IBaseRuntimeProps {
  /**
   * Props to inject on runtime to override all other props
   * Main use case is passing props in RenderProps to runtime component
   */
  overrideProps?: IPropModel
  setOverrideProps(props: IPropModel): void
}

export interface IRuntimeElementPropModel extends IBaseRuntimeProps {
  /**
   * Evaluated Props for child mapper
   */
  evaluatedChildMapperProp?: Array<IPropData>
}
