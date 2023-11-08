import type {
  IRuntimeComponentPropDTO,
  IRuntimeComponentPropModel,
  IRuntimeContainerNodeModel,
} from '@codelab/frontend/abstract/application'
import {
  getRendererService,
  IEvaluationContext,
  isRuntimeElementRef,
} from '@codelab/frontend/abstract/application'
import {
  DATA_COMPONENT_ID,
  IComponentModel,
  IPropModel,
  isTypedProp,
} from '@codelab/frontend/abstract/domain'
import { evaluateObject } from '@codelab/frontend/application/shared/core'
import { mergeProps } from '@codelab/frontend/domain/prop'
import type { IPropData } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { mapDeep } from '@codelab/shared/utils'
import { computed } from 'mobx'
import type { ObjectMap, Ref } from 'mobx-keystone'
import {
  idProp,
  Model,
  model,
  modelAction,
  objectMap,
  prop,
} from 'mobx-keystone'
import { RuntimeContainerNodeFactory } from './runtime-container-node.factory'

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
    overrideProps: prop<Maybe<IPropModel>>(undefined),
    runtimeComponents: prop<ObjectMap<IRuntimeContainerNodeModel>>(() =>
      objectMap([]),
    ),
    runtimeContainerNodeRef: prop<Ref<IRuntimeContainerNodeModel>>(),
  })
  implements IRuntimeComponentPropModel
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
    return mergeProps(
      this.evaluatedProps,
      this.instanceElementProps,
      this.childMapperProps,
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
  get childMapperProps(): Maybe<IPropData> {
    const parentRuntimeContainerNodeRef = this.runtimeContainerNode.parentRef

    const parentIsRuntimeElement =
      parentRuntimeContainerNodeRef &&
      isRuntimeElementRef(parentRuntimeContainerNodeRef)

    const runtimeParentElementProps = parentIsRuntimeElement
      ? parentRuntimeContainerNodeRef.current.runtimeProps
      : undefined

    const props = runtimeParentElementProps?.evaluatedChildMapperProp || []
    const index = this.runtimeContainerNode.childMapperIndex

    return index ? props[index] : undefined
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
      this.overrideProps?.values,
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

  @modelAction
  addRuntimeComponent(component: IComponentModel) {
    const runtimeComponent = RuntimeContainerNodeFactory.create({
      containerNode: component,
    })

    this.runtimeComponents.set(runtimeComponent.id, runtimeComponent)

    return runtimeComponent
  }

  @modelAction
  setOverrideProps(overrideProps: IPropModel) {
    this.overrideProps = overrideProps
  }
}
