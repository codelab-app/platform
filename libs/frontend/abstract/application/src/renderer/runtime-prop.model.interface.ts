import type {
  IComponentModel,
  IElementModel,
} from '@codelab/frontend/abstract/domain'
import type { IPropData } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { IEvaluationContext } from './runtime-element.model.interface'

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
   * Ref for node that holds the props either element or component
   */
  nodeRef: Ref<IComponentModel> | Ref<IElementModel>
  /**
   * Props in initial state before any transformation
   */
  props: IPropData
  /**
   * This is the evaluation context for props
   */
  propsEvaluationContext: IEvaluationContext
}
