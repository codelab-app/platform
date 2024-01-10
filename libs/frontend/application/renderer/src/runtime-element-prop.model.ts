import type {
  IRuntimeActionModel,
  IRuntimeElementModel,
  IRuntimeElementPropModel,
} from '@codelab/frontend/abstract/application'
import {
  getRendererService,
  IEvaluationContext,
  RendererType,
} from '@codelab/frontend/abstract/application'
import {
  CUSTOM_TEXT_PROP_KEY,
  DATA_ELEMENT_ID,
  isAtomRef,
  isComponent,
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
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

@model('@codelab/RuntimeProps')
export class RuntimeElementPropsModel
  extends Model({
    id: idProp,
    runtimeElement: prop<Ref<IRuntimeElementModel>>(),
  })
  implements IRuntimeElementPropModel
{
  @computed
  get element() {
    return this.runtimeElement.current.element.current
  }

  @computed
  get closestRuntimeContainerNode() {
    return this.runtimeElement.current.closestContainerNode.current
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

  transformRuntimeActions(
    runtimeActions: Array<IRuntimeActionModel>,
    context: IEvaluationContext,
  ) {
    return runtimeActions
      .map((runtimeAction) => ({
        [runtimeAction.action.current.name]: runtimeAction.runner.bind(context),
      }))
      .reduce(merge, {})
  }

  addActions(context: IEvaluationContext) {
    context['actions'] = this.transformRuntimeActions(
      this.runtimeStore.runtimeActionsList,
      context,
    )

    context['rootActions'] = this.providerStore?.runtimeActionsList
      ? this.transformRuntimeActions(
          this.providerStore.runtimeActionsList,
          context,
        )
      : {}

    return context
  }

  @modelAction
  getActionRunner(actionName: string) {
    return (
      this.expressionEvaluationContext.actions[actionName] ??
      this.expressionEvaluationContext.rootActions[actionName] ??
      (() => console.log(`No Runner found for ${actionName} `))
    )
  }

  @computed
  get props() {
    // memorize values or else it will be lost inside callback
    const registerReference = isAtomRef(this.element.renderType)
    const slug = this.element.slug
    const store = this.runtimeStore
    const renderType = this.element.renderType.current
    const defaultProps = renderType.api.current.defaultValues
    const props = mergeProps(defaultProps, this.element.props.values)

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

  @computed
  get propsEvaluationContext(): IEvaluationContext {
    const componentProps = isComponent(
      this.closestRuntimeContainerNode.containerNode,
    )
      ? this.closestRuntimeContainerNode.containerNode.props.values
      : {}

    return this.addActions({
      actions: {},

      args: [],

      componentProps: {},
      // pass empty object because props can't evaluated by itself
      props: {},
      refs: this.runtimeStore.refs,
      rootActions: {},
      rootRefs: this.providerStore?.refs ?? {},
      rootState: this.providerStore?.state ?? {},
      state: this.runtimeStore.state,
      url: this.urlProps ?? {},
    })
  }

  @computed
  get expressionEvaluationContext(): IEvaluationContext {
    return this.addActions({
      ...this.propsEvaluationContext,
      props: this.evaluatedProps,
    })
  }
}
