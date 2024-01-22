import type { IPropData } from '@codelab/shared/abstract/core'
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
   * The props used for evaluating expressions, which includes `evaluatedProps`
   */
  expressionEvaluationContext: IEvaluationContext
  /**
   * Props in initial state before any transformation
   */
  props: IPropData
  /**
   * Root runtime components/elements for RenderProps, ReactNode, ElementType props
   */
  // runtimeRootNodes: ObjectMap<IRuntimeModel>
}

export interface IRuntimeComponentPropModel extends IBaseRuntimeProps {
  /**
   * Evaluated Props for child mapper
   */
  childMapperProp?: IPropData
  componentEvaluatedProps: IPropData
  instanceElementProps?: IPropData
}

export interface IRuntimeElementPropModel extends IBaseRuntimeProps {
  closestRuntimeContainerNode: IRuntimeContainerNodeModel
  /**
   * Evaluated Props for child mapper
   */
  evaluatedChildMapperProps?: Array<IPropData>

  propsEvaluationContext: IEvaluationContext

  // eslint-disable-next-line @typescript-eslint/ban-types
  getActionRunner(actionName: string): Function
}
