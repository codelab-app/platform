import type { IPropModel } from '@codelab/frontend/abstract/domain'
import type { IComponent, IPropData } from '@codelab/shared/abstract/core'
import type { ObjectMap } from 'mobx-keystone'
import type { IRuntimeContainerNodeModel } from '../runtime-container-node'

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
  /**
   * root runtime components for RenderProps and ReactNode props
   */
  runtimeComponents: ObjectMap<IRuntimeContainerNodeModel>

  addRuntimeComponent(component: IComponent): IRuntimeContainerNodeModel
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
