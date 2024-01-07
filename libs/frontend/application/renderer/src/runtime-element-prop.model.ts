import type {
  IRuntimeElementModel,
  IRuntimeElementPropDTO,
  IRuntimeElementPropModel,
  IRuntimeModel,
} from '@codelab/frontend/abstract/application'
import {
  getRendererService,
  IEvaluationContext,
  isRuntimeContainerNode,
  RendererType,
  runtimeElementRef,
} from '@codelab/frontend/abstract/application'
import {
  CUSTOM_TEXT_PROP_KEY,
  DATA_ELEMENT_ID,
  elementRef,
  IComponentModel,
  IElementModel,
  isAtomRef,
  isTypedProp,
} from '@codelab/frontend/abstract/domain'
import {
  evaluateExpression,
  evaluateObject,
  hasStateExpression,
} from '@codelab/frontend/application/shared/core'
import { mergeProps } from '@codelab/frontend/domain/prop'
import type { IPropData } from '@codelab/shared/abstract/core'
import { mapDeep } from '@codelab/shared/utils'
import get from 'lodash/get'
import merge from 'lodash/merge'
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
import { v4 } from 'uuid'
import { RuntimeContainerNodeFactory } from './runtime-container-node.factory'
import { RuntimeElement } from './runtime-element.model'

const create = (dto: IRuntimeElementPropDTO) => new RuntimeElementProps(dto)

@model('@codelab/RuntimeElementProps')
export class RuntimeElementProps
  extends Model({
    element: prop<Ref<IElementModel>>(),
    id: idProp,
    runtimeElement: prop<Ref<IRuntimeElementModel>>(),
    runtimeRootNodes: prop<ObjectMap<IRuntimeModel>>(() => objectMap([])),
  })
  implements IRuntimeElementPropModel
{
  static create = create

  @computed
  get closestRuntimeContainerNode() {
    return this.runtimeElement.current.closestRuntimeContainerNode
  }

  @computed
  get runtimeStore() {
    return this.closestRuntimeContainerNode.runtimeStore
  }

  @computed
  get providerStore() {
    return this.runtimeStore.runtimeProviderStore?.current
  }

  @computed
  private get rendererService() {
    return getRendererService(this)
  }

  @computed
  get renderer() {
    const activeRenderer = this.rendererService.activeRenderer?.current

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
    if (!this.element.current.childMapperPropKey) {
      return []
    }

    if (hasStateExpression(this.element.current.childMapperPropKey)) {
      const evaluatedExpression = evaluateExpression(
        this.element.current.childMapperPropKey,
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
      this.element.current.childMapperPropKey,
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

      return transformer.transform(value, this.element.current)
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

    const customTextProp =
      this.element.current.props.values[CUSTOM_TEXT_PROP_KEY]

    const props = omit(this.renderedTypedProps, [CUSTOM_TEXT_PROP_KEY])
    const evaluated = evaluateObject(props, this.propsEvaluationContext)

    return { ...evaluated, [CUSTOM_TEXT_PROP_KEY]: customTextProp }
  }

  @computed
  get props() {
    // memorize values or else it will be lost inside callback
    const registerReference = isAtomRef(this.element.current.renderType)
    const slug = this.element.current.slug
    const store = this.runtimeStore
    const renderType = this.element.current.renderType.current
    const defaultProps = renderType.api.current.defaultValues
    const props = mergeProps(defaultProps, this.element.current.props.values)

    return {
      ...props,
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

  @modelAction
  getActionRunner(actionName: string) {
    return (
      this.expressionEvaluationContext.actions[actionName] ??
      this.expressionEvaluationContext.rootActions[actionName] ??
      (() => console.log(`No Runner found for ${actionName} `))
    )
  }

  @modelAction
  private addBoundedActionRunner(
    context: Omit<IEvaluationContext, 'actions' | 'rootActions'>,
  ): IEvaluationContext {
    const actions = this.runtimeStore.runtimeActionsList
      .map((action) => ({
        [action.action.current.name]: action.runner.bind(context),
      }))
      .reduce(merge, {})

    const rootActions =
      this.runtimeStore.runtimeProviderStore?.current.runtimeActionsList
        .map((action) => ({
          [action.action.current.name]: action.runner.bind(context),
        }))
        .reduce(merge, {}) ?? {}

    return {
      ...context,
      actions,
      rootActions,
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

    return this.addBoundedActionRunner({
      componentProps: componentProps ?? {},
      // pass empty object because props can't evaluated by itself
      props: {},
      refs: this.runtimeStore.refs,
      rootRefs: this.providerStore?.refs ?? {},
      rootState: this.providerStore?.state ?? {},
      state: this.runtimeStore.state,
      url: this.urlProps ?? {},
    })
  }

  @computed
  get expressionEvaluationContext(): IEvaluationContext {
    return this.addBoundedActionRunner({
      ...this.propsEvaluationContext,
      props: this.evaluatedProps,
    })
  }

  // TODO: move repeated logic to a base class
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
    const id = v4()

    const runtimeElement = RuntimeElement.create({
      element: elementRef(element.id),
      id,
      parent: runtimeElementRef(this.id),
    })

    this.runtimeRootNodes.set(runtimeElement.id, runtimeElement)

    return runtimeElement
  }
}
