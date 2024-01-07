import type {
  IRuntimeComponentPropDTO,
  IRuntimeComponentPropModel,
  IRuntimeContainerNodeModel,
  IRuntimeModel,
} from '@codelab/frontend/abstract/application'
import {
  getRendererService,
  IEvaluationContext,
  isRuntimeElementRef,
  runtimeContainerNodeRef,
} from '@codelab/frontend/abstract/application'
import {
  DATA_COMPONENT_ID,
  elementRef,
  IComponentModel,
  IElementModel,
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
import { v4 } from 'uuid'
import { RuntimeContainerNodeFactory } from './runtime-container-node.factory'
import { RuntimeElement } from './runtime-element.model'

const create = (dto: IRuntimeComponentPropDTO) => {
  return new RuntimeComponentProps(dto)
}

@model('@codelab/RuntimeComponentProps')
export class RuntimeComponentProps
  extends Model({
    component: prop<Ref<IComponentModel>>(),
    id: idProp,
    overrideProps: prop<Maybe<IPropModel>>(undefined),
    runtimeContainerNode: prop<Ref<IRuntimeContainerNodeModel>>(),
    runtimeRootNodes: prop<ObjectMap<IRuntimeModel>>(() => objectMap([])),
  })
  implements IRuntimeComponentPropModel
{
  static create = create

  @computed
  get runtimeStore() {
    return this.runtimeContainerNode.current.runtimeStore
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

      return transformer.transform(value, this.component.current)
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
  get instanceElementProps(): Maybe<IPropData> {
    const { parent } = this.runtimeContainerNode.current

    return parent && isRuntimeElementRef(parent)
      ? parent.current.runtimeProps.evaluatedProps
      : undefined
  }

  @computed
  get childMapperProps(): Maybe<IPropData> {
    const { parent } = this.runtimeContainerNode.current
    const parentIsRuntimeElement = parent && isRuntimeElementRef(parent)

    const runtimeParentElementProps = parentIsRuntimeElement
      ? parent.current.runtimeProps
      : undefined

    const props = runtimeParentElementProps?.evaluatedChildMapperProp || []
    const index = this.runtimeContainerNode.current.childMapperIndex

    return index ? props[index] : undefined
  }

  @computed
  get props() {
    return mergeProps(
      this.component.current.api.current.defaultValues,
      this.component.current.props.values,
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
  getActionRunner(actionName: string) {
    return (
      this.expressionEvaluationContext.actions[actionName] ??
      this.expressionEvaluationContext.rootActions[actionName] ??
      (() => console.log(`No Runner found for ${actionName} `))
    )
  }

  @modelAction
  addRuntimeComponentModel(containerNode: IComponentModel) {
    const runtimeNode = RuntimeContainerNodeFactory.create({
      containerNode,
    })

    this.runtimeRootNodes.set(runtimeNode.id, runtimeNode)

    return runtimeNode
  }

  @modelAction
  addRuntimeElementModel(element: IElementModel) {
    const runtimeRootElementId = v4()

    const runtimeRootElement = RuntimeElement.create({
      element: elementRef(element.id),
      id: runtimeRootElementId,
      parent: runtimeContainerNodeRef(this.id),
    })

    this.runtimeRootNodes.set(runtimeRootElement.id, runtimeRootElement)

    return runtimeRootElement
  }

  @modelAction
  setOverrideProps(overrideProps: IPropModel) {
    this.overrideProps = overrideProps
  }
}
