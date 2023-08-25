import type {
  IComponent,
  IComponentRuntimeProp,
  IElementRuntimeProp,
} from '@codelab/frontend/abstract/core'
import { DATA_COMPONENT_ID } from '@codelab/frontend/abstract/core'
import { evaluateObject } from '@codelab/frontend/shared/utils'
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
      {
        [DATA_COMPONENT_ID]: this.node.id,
        key: this.node.id,
      },
    )
  }

  @computed
  get evaluatedProps() {
    return evaluateObject(this.renderedTypedProps, {
      componentProps: {},
      props: {},
      refs: this.node.store.current.refs,
      rootRefs: {},
      rootState: {},
      state: this.node.store.current.state,
      url: {},
    })
  }

  @computed
  get evaluatedPropsBeforeRender() {
    return evaluateObject(this.props, {
      componentProps: {},
      props: {},
      refs: this.node.store.current.refs,
      rootRefs: {},
      rootState: {},
      state: this.node.store.current.state,
      url: {},
    })
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
