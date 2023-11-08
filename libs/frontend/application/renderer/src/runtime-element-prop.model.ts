import type {
  IRuntimeContainerNodeModel,
  IRuntimeElementModel,
  IRuntimeElementPropDTO,
  IRuntimeElementPropModel,
  IRuntimeStoreModel,
} from '@codelab/frontend/abstract/application'
import {
  getRendererService,
  IEvaluationContext,
  isRuntimeContainerNode,
  RendererType,
} from '@codelab/frontend/abstract/application'
import type { IElementModel } from '@codelab/frontend/abstract/domain'
import {
  CUSTOM_TEXT_PROP_KEY,
  DATA_ELEMENT_ID,
  IComponentModel,
  isAtomRef,
  isTypedProp,
} from '@codelab/frontend/abstract/domain'
import {
  evaluateExpression,
  evaluateObject,
  hasStateExpression,
} from '@codelab/frontend/application/shared/core'
import { getDefaultFieldProps } from '@codelab/frontend/domain/prop'
import { type IPropData } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { mapDeep } from '@codelab/shared/utils'
import get from 'lodash/get'
import omit from 'lodash/omit'
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

const create = ({ elementRef, runtimeElementRef }: IRuntimeElementPropDTO) => {
  return new RuntimeElementProps({
    elementRef,
    runtimeElementRef,
  })
}

@model('@codelab/RuntimeElementProps')
export class RuntimeElementProps
  extends Model({
    elementRef: prop<Ref<IElementModel>>(),
    id: idProp,
    runtimeComponents: prop<ObjectMap<IRuntimeContainerNodeModel>>(() =>
      objectMap([]),
    ),
    runtimeElementRef: prop<Ref<IRuntimeElementModel>>(),
  })
  implements IRuntimeElementPropModel
{
  static create = create

  @computed
  get element() {
    return this.elementRef.current
  }

  @computed
  get closestRuntimeContainerNode() {
    return this.runtimeElementRef.current.closestRuntimeContainerNode
  }

  @computed
  get runtimeStore() {
    return this.closestRuntimeContainerNode.runtimeStore
  }

  @computed
  get providerStore(): Maybe<IRuntimeStoreModel> {
    return this.runtimeStore.runtimeProviderSore
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
  get urlProps(): IPropData | undefined {
    return this.renderer.urlSegments
  }

  @computed
  get evaluatedChildMapperProp() {
    if (!this.element.childMapperPropKey) {
      return []
    }

    if (hasStateExpression(this.element.childMapperPropKey)) {
      const evaluatedExpression = evaluateExpression(
        this.element.childMapperPropKey,
        this.propsEvaluationContext,
      )

      if (!Array.isArray(evaluatedExpression)) {
        console.error('The evaluated childMapperPropKey is not an array')

        return []
      }

      return evaluatedExpression
    }

    const evaluatedChildMapperProp = get(
      this.expressionEvaluationContext,
      this.element.childMapperPropKey,
    )

    if (!Array.isArray(evaluatedChildMapperProp)) {
      console.error('The evaluated childMapperPropKey is not an array')

      return []
    }

    return evaluatedChildMapperProp
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

      return transformer.transform(value, this.element)
    })
  }

  @computed
  get evaluatedProps() {
    // Evaluate customText prop only in preview and production modes
    if (
      this.renderer.rendererType === RendererType.Preview ||
      this.renderer.rendererType === RendererType.Production
    ) {
      return evaluateObject(
        this.renderedTypedProps,
        this.propsEvaluationContext,
      )
    }

    const customTextProp = this.element.props.values[CUSTOM_TEXT_PROP_KEY]
    const props = omit(this.renderedTypedProps, [CUSTOM_TEXT_PROP_KEY])
    const evaluated = evaluateObject(props, this.propsEvaluationContext)

    return { ...evaluated, [CUSTOM_TEXT_PROP_KEY]: customTextProp }
  }

  @computed
  get evaluatedPropsBeforeRender() {
    return evaluateObject(this.props, this.propsEvaluationContext)
  }

  @computed
  get props() {
    // memorize values or else it will be lost inside callback
    const registerReference = isAtomRef(this.element.renderType)
    const slug = this.element.slug
    const store = this.runtimeStore

    return {
      ...getDefaultFieldProps(this.element.renderType.current),
      ...this.element.props.values,
      /**
       * Internal system props for meta data, use double underline for system-defined identifiers.
       */
      [DATA_ELEMENT_ID]: this.element.id,
      key: this.element.id,
      ref: registerReference
        ? (node: HTMLElement) => store.registerRef(slug, node)
        : undefined,
    }
  }

  @computed
  get propsEvaluationContext(): IEvaluationContext {
    const isInsideComponent = isRuntimeContainerNode(
      this.closestRuntimeContainerNode,
    )

    const componentProps = isInsideComponent
      ? this.closestRuntimeContainerNode.runtimeProps?.evaluatedProps
      : {}

    return {
      actions: this.runtimeStore.runtimeActions,
      componentProps: componentProps ?? {},
      // pass empty object because props can't evaluated by itself
      props: {},
      refs: this.runtimeStore.refs,
      rootActions: this.providerStore?.runtimeActions ?? {},
      rootRefs: this.providerStore?.refs ?? {},
      rootState: this.providerStore?.state ?? {},
      state: this.runtimeStore.state,
      url: this.urlProps ?? {},
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
}
