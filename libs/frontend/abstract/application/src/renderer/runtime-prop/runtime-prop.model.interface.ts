import type { IPropModel } from '@codelab/frontend/abstract/domain'
import type { IPropData } from '@codelab/shared/abstract/core'
import type { ReactNode } from 'react'
import type { IRuntimeComponentModel } from '../runtime-component'
import type { IRuntimePageModel } from '../runtime-page'

export interface IRuntimeContext {
  actions: IPropData
  args?: Array<unknown>
  componentProps?: IPropData
  props: IPropData
  refs: IPropData
  rootActions: IPropData
  rootRefs: IPropData
  /**
   * Provider state from the provider page's store. The data here is passed to elements & components
   */
  rootState: IPropData
  state: IPropData
  urlProps: IPropData
}

export interface IBaseRuntimeProps {
  /**
   * Final output after rendering typedProps
   */
  evaluatedProps: IPropData
  /**
   * Props in initial state before any transformation
   */
  props: IPropData
  /**
   * The runtime context of element props, state, actions,...etc)
   */
  runtimeContext: IRuntimeContext
}

export interface IRuntimeComponentPropModel extends IBaseRuntimeProps {
  /**
   * Evaluated Props for child mapper
   */
  childMapperProp?: IPropData
  componentEvaluatedProps: IPropData
  customProps?: IPropModel
  instanceElementProps?: IPropData

  setCustomProps(props: IPropModel): void
}

export interface IRuntimeElementPropModel extends IBaseRuntimeProps {
  closestRuntimeContainerNode: IRuntimeComponentModel | IRuntimePageModel
  /**
   * Evaluated Props for child mapper
   */
  evaluatedChildMapperProps?: Array<IPropData>
  // same as runtimeContext but props are empty
  evaluationContext: IRuntimeContext
  renderedChildrenProp: ReactNode
  // eslint-disable-next-line @typescript-eslint/ban-types
  getActionRunner(actionName: string): Function
}
