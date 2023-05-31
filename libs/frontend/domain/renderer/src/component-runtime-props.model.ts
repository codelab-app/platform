import type {
  IComponent,
  IComponentRuntimeProp,
  IElementRuntimeProp,
} from '@codelab/frontend/abstract/core'
import { DATA_COMPONENT_ID, IPropData } from '@codelab/frontend/abstract/core'
import { replaceStateInProps } from '@codelab/frontend/shared/utils'
import { Maybe } from '@codelab/shared/abstract/types'
import { mergeProps } from '@codelab/shared/utils'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'
import { BaseRuntimeProps } from './base-runtime-props.model'

/**
 * The pipeline is as follow
 *
 * (component.props + component.api.defaultValues )->
 *         preProceedProps ->
 *               renderedTypedProps ->
 *                                evaluatedProps
 *
 * evaluatedProps + instanceElementProps.evaluatedProps => componentEvaluatedProps
 */

const create = (nodeRef: Ref<IComponent>) =>
  new ComponentRuntimeProps({ nodeRef })

@model('@codelab/ComponentRuntimeProps')
export class ComponentRuntimeProps
  extends ExtendedModel(
    modelClass<BaseRuntimeProps<IComponent>>(BaseRuntimeProps),
    {},
  )
  implements IComponentRuntimeProp
{
  @computed
  get instanceElementProps(): Maybe<IElementRuntimeProp> {
    return this.node.instanceElement?.current.runtimeProp
  }

  @computed
  get props() {
    return mergeProps(
      this.node.api.current.defaultValues,
      this.node.props.current.values,
      /**
       * Internal system props for meta data, use double underline for system-defined identifiers.
       */
      { [DATA_COMPONENT_ID]: this.node.id, key: this.node.id },
    )
  }

  @computed
  get preProceedProps(): IPropData {
    return this.props
  }

  @computed
  get evaluatedProps() {
    return replaceStateInProps(
      this.renderedTypedProps,
      this.node.store.current.state,
    )
  }

  @computed
  get evaluatedPropsBeforeRender() {
    return replaceStateInProps(this.props, this.node.store.current.state)
  }

  @computed
  get componentEvaluatedProps() {
    return mergeProps(
      this.evaluatedProps,
      this.instanceElementProps?.evaluatedProps,
    )
  }

  static create = create
}
