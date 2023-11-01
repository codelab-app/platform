import type {
  IRuntimeComponent,
  IRuntimeComponentDto,
  IRuntimeElementModel,
} from '@codelab/frontend/abstract/application'
import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import { DATA_COMPONENT_ID } from '@codelab/frontend/abstract/domain'
import { evaluateObject } from '@codelab/frontend/application/shared/core'
import { mergeProps } from '@codelab/frontend/domain/prop'
import { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'
import { RuntimeBase } from './runtime-base.model'

/**
 * The pipeline is as follow
 *
 * (component.props + component.api.defaultValues )->
 *               renderedTypedProps ->
 *                                evaluatedProps
 *
 * evaluatedProps + instanceElementProps.evaluatedProps => componentEvaluatedProps
 *
 * Finds all the components that are referenced by all the children of this component as well as the children of any of these found components recursively
 */

const create = (dto: IRuntimeComponentDto) =>
  new RuntimeComponent({ nodeRef: dto.nodeRef })

@model('@codelab/RuntimeComponent')
export class RuntimeComponent
  extends ExtendedModel(
    modelClass<RuntimeBase<IComponentModel>>(RuntimeBase),
    {},
  )
  implements IRuntimeComponent
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
  get instanceElementProps(): Maybe<IRuntimeElementModel> {
    const instanceElement = this.node.instanceElement?.current

    return instanceElement
      ? this.renderer?.runtimeElement(instanceElement)
      : undefined
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
