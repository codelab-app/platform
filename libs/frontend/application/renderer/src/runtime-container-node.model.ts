import type {
  IRuntimeContainerNodeDTO,
  IRuntimeContainerNodeModel,
  IRuntimeElementModel,
  IRuntimeModelRef,
  IRuntimeStoreModel,
} from '@codelab/frontend/abstract/application'
import {
  getRendererService,
  IEvaluationContext,
  isRuntimeElementRef,
} from '@codelab/frontend/abstract/application'
import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import {
  DATA_COMPONENT_ID,
  isComponent,
  isTypedProp,
} from '@codelab/frontend/abstract/domain'
import { evaluateObject } from '@codelab/frontend/application/shared/core'
import { mergeProps } from '@codelab/frontend/domain/prop'
import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { mapDeep } from '@codelab/shared/utils'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, prop } from 'mobx-keystone'
import type { ReactElement } from 'react'

const create = ({
  containerNodeRef,
  id,
  parentRef,
  runtimeRootElement,
  runtimeStore,
}: IRuntimeContainerNodeDTO) =>
  new RuntimeContainerNodeModel({
    containerNodeRef,
    id,
    parentRef,
    runtimeRootElement,
    runtimeStore,
  })

@model('@codelab/RuntimeContainerNode')
export class RuntimeContainerNodeModel
  extends Model({
    containerNodeRef: prop<Ref<IComponentModel> | Ref<IPageModel>>(),
    id: idProp,
    parentRef: prop<Maybe<IRuntimeModelRef>>(),
    runtimeRootElement: prop<IRuntimeElementModel>(),
    runtimeStore: prop<IRuntimeStoreModel>(),
  })
  implements IRuntimeContainerNodeModel
{
  static create = create

  @computed
  get renderer() {
    const activeRenderer = getRendererService(this).activeRenderer?.current

    if (!activeRenderer) {
      throw new Error('No active Renderer was found')
    }

    return activeRenderer
  }

  @computed
  get containerNode() {
    return this.containerNodeRef.current
  }

  @computed
  get componentEvaluatedProps() {
    return mergeProps(
      this.evaluatedProps,
      this.instanceElementProps?.runtimeProps.evaluatedProps,
    )
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

      if (!transformer || !isComponent(this.containerNode)) {
        return value.value
      }

      return transformer.transform(value, this.containerNode)
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
  get instanceElementProps(): Maybe<IRuntimeElementModel> {
    return this.parentRef && isRuntimeElementRef(this.parentRef)
      ? this.parentRef.current
      : undefined
  }

  @computed
  get props() {
    // only component has props
    const props = isComponent(this.containerNode)
      ? mergeProps(
          this.containerNode.api.current.defaultValues,
          this.containerNode.props.values,
        )
      : {}

    return mergeProps({
      ...props,
      [DATA_COMPONENT_ID]: this.containerNode.id,
      key: this.containerNode.id,
    })
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

  @computed
  get render(): Nullable<ReactElement> {
    return this.runtimeRootElement.render
  }
}
