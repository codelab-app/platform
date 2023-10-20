import type {
  IComponentModel,
  IComponentRuntimeProp,
  IElementRuntimeProp,
} from '@codelab/frontend/abstract/domain'
import { DATA_COMPONENT_ID } from '@codelab/frontend/abstract/domain'
import { mergeProps } from '@codelab/frontend/domain/prop'
import { evaluateObject } from '@codelab/frontend/shared/utils'
import { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'
import { BaseRuntimeProps } from './base-runtime-props.model'

/**
 * The pipeline is as follow
 *
 * (component.props + component.api.defaultValues )->
 *               renderedTypedProps ->
 *                                evaluatedProps
 *
 * evaluatedProps + instanceElementProps.evaluatedProps => componentEvaluatedProps
 */

const create = (nodeRef: Ref<IComponentModel>) =>
  new ComponentRuntimeProps({ nodeRef })

@model('@codelab/ComponentRuntimeProps')
export class ComponentRuntimeProps
  extends ExtendedModel(
    modelClass<BaseRuntimeProps<IComponentModel>>(BaseRuntimeProps),
    {},
  )
  implements IComponentRuntimeProp
{
  static create = create

  @computed
  get componentEvaluatedProps() {
    return mergeProps(
      this.evaluatedProps,
      this.instanceElementProps?.evaluatedProps,
    )
  }

  @computed
  get evaluatedProps() {
    return evaluateObject(this.renderedTypedProps, {
      actions: {},
      componentProps: {},
      props: {},
      refs: this.node.store.current.refs,
      rootActions: {},
      rootRefs: {},
      rootState: {},
      state: this.node.store.current.state,
      url: {},
    })
  }

  @computed
  get evaluatedPropsBeforeRender() {
    return evaluateObject(this.props, {
      actions: {},
      componentProps: {},
      props: {},
      refs: this.node.store.current.refs,
      rootActions: {},
      rootRefs: {},
      rootState: {},
      state: this.node.store.current.state,
      url: {},
    })
  }

  @computed
  get instanceElementProps(): Maybe<IElementRuntimeProp> {
    return this.node.instanceElement?.current.runtimeProp
  }

  @computed
  get props() {
    return mergeProps(
      this.node.api.current.defaultValues,
      this.node.props.values,
      /**
       * Internal system props for meta data, use double underline for system-defined identifiers.
       */
      {
        [DATA_COMPONENT_ID]: this.node.id,
        key: this.node.id,
      },
    )
  }
}
