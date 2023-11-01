import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import type { IPropData } from '@codelab/shared/abstract/core'
import type { Maybe } from '@graphql-tools/utils'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeBase } from './runtime.model.interface'
import type { IRuntimeElement } from './runtime-element.model.interface'

export interface IRuntimeComponentDto {
  nodeRef: Ref<IComponentModel>
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
