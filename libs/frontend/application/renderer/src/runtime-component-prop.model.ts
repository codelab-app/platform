import {
  getRendererService,
  IEvaluationContext,
  type IRuntimeComponentPropDTO,
  type IRuntimeContainerNodeModel,
  type IRuntimePropModel,
  isRuntimeElementRef,
} from '@codelab/frontend/abstract/application'
import {
  DATA_COMPONENT_ID,
  type IComponentModel,
  isTypedProp,
} from '@codelab/frontend/abstract/domain'
import { evaluateObject } from '@codelab/frontend/application/shared/core'
import { mergeProps } from '@codelab/frontend/domain/prop'
import type { IPropData } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { mapDeep } from '@codelab/shared/utils'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, prop } from 'mobx-keystone'

const create = ({
  componentRef,
  runtimeContainerNodeRef,
}: IRuntimeComponentPropDTO) => {
  return new RuntimeComponentProps({
    componentRef,
    runtimeContainerNodeRef,
  })
}

@model('@codelab/RuntimeComponentProps')
export class RuntimeComponentProps
  extends Model({
    componentRef: prop<Ref<IComponentModel>>(),
    id: idProp,
    runtimeContainerNodeRef: prop<Ref<IRuntimeContainerNodeModel>>(),
  })
  implements IRuntimePropModel
{
  static create = create

  @computed
  get component() {
    return this.componentRef.current
  }

  @computed
  get runtimeContainerNode() {
    return this.runtimeContainerNodeRef.current
  }

  @computed
  get runtimeStore() {
    return this.runtimeContainerNode.runtimeStore
  }

  @computed
  get renderer() {
    const activeRenderer = getRendererService(this).activeRenderer?.current

    if (!activeRenderer) {
      throw new Error('No active Renderer was found')
    }

    return activeRenderer
  }

  @computed
  get componentEvaluatedProps() {
    return mergeProps(this.evaluatedProps, this.instanceElementProps)
  }

  /**
   * Applies all the type transformers to the props
   */
  @computed
  get renderedTypedProps() {
    return mapDeep(this.props, (value) => {
      if (!isTypedProp(value)) {
        return value
      }

      if (!value.value) {
        return undefined
      }

      const transformer = this.renderer.typedPropTransformers.get(value.kind)

      if (!transformer) {
        return value.value
      }

      return transformer.transform(value, this.component)
    })
  }

  @computed
  get evaluatedProps() {
    return evaluateObject(this.renderedTypedProps, {
      actions: {},
      componentProps: {},
      props: {},
      refs: this.runtimeStore.refs,
      rootActions: {},
      rootRefs: {},
      rootState: {},
      state: this.runtimeStore.state,
      url: {},
    })
  }

  @computed
  get evaluatedPropsBeforeRender() {
    return evaluateObject(this.props, {
      actions: {},
      componentProps: {},
      props: {},
      refs: this.runtimeStore.refs,
      rootActions: {},
      rootRefs: {},
      rootState: {},
      state: this.runtimeStore.state,
      url: {},
    })
  }

  @computed
  get instanceElementProps(): Maybe<IPropData> {
    const parentRuntimeContainerNodeRef = this.runtimeContainerNode.parentRef

    return parentRuntimeContainerNodeRef &&
      isRuntimeElementRef(parentRuntimeContainerNodeRef)
      ? parentRuntimeContainerNodeRef.current.runtimeProps.evaluatedProps
      : undefined
  }

  @computed
  get props() {
    return mergeProps(
      this.component.api.current.defaultValues,
      this.component.props.values,
      {
        [DATA_COMPONENT_ID]: this.component.id,
        key: this.component.id,
      },
    )
  }

  @computed
  get propsEvaluationContext(): IEvaluationContext {
    return {
      actions: {},
      componentProps: {},
      // pass empty object because props can't evaluated by itself
      props: {},
      refs: this.runtimeStore.refs,
      rootActions: {},
      rootRefs: {},
      rootState: {},
      state: this.runtimeStore.state,
      url: {},
    }
  }

  @computed
  get expressionEvaluationContext(): IEvaluationContext {
    return {
      ...this.propsEvaluationContext,
      props: this.evaluatedProps,
    }
  }
}
