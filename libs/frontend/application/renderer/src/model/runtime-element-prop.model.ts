import type {
  IRuntimeActionModel,
  IRuntimeElementModel,
  IRuntimeElementPropDTO,
  IRuntimeElementPropModel,
} from '@codelab/frontend/abstract/application'
import {
  getRendererService,
  getRouterService,
  IEvaluationContext,
  isRuntimeComponent,
  RendererType,
} from '@codelab/frontend/abstract/application'
import {
  DATA_ELEMENT_ID,
  isAtomRef,
  isComponentRef,
  isTypedProp,
} from '@codelab/frontend/abstract/domain'
import { mergeProps } from '@codelab/frontend/domain/prop'
import { type IPropData, ITypeKind } from '@codelab/shared/abstract/core'
import {
  evaluateExpression,
  evaluateObject,
  hasExpression,
  mapDeep,
} from '@codelab/shared/utils'
import get from 'lodash/get'
import merge from 'lodash/merge'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'
import React, { ReactNode } from 'react'
import { CodeMirrorEditorWrapper, RichTextEditorWrapper } from '../wrappers'

const create = (dto: IRuntimeElementPropDTO) =>
  new RuntimeElementPropsModel(dto)

@model('@codelab/RuntimeElementProps')
export class RuntimeElementPropsModel
  extends Model({
    id: idProp,
    runtimeElement: prop<Ref<IRuntimeElementModel>>(),
  })
  implements IRuntimeElementPropModel
{
  static create = create

  @computed
  get closestRuntimeContainerNode() {
    return this.runtimeElement.current.closestContainerNode.current
  }

  @computed
  get element() {
    return this.runtimeElement.current.element.current
  }

  @computed
  get evaluatedChildMapperProps() {
    if (!this.element.childMapperPropKey) {
      return []
    }

    if (hasExpression(this.element.childMapperPropKey)) {
      const evaluatedExpression = evaluateExpression(
        this.element.childMapperPropKey,
        this.expressionEvaluationContext,
      )

      if (!Array.isArray(evaluatedExpression)) {
        console.error('The evaluated childMapperPropKey is not an array')

        return []
      }

      return evaluatedExpression
    }

    const evaluatedChildMapperProps = get(
      this.expressionEvaluationContext,
      this.element.childMapperPropKey,
    )

    if (!Array.isArray(evaluatedChildMapperProps)) {
      console.error('The evaluated childMapperPropKey is not an array')

      return []
    }

    return evaluatedChildMapperProps
  }

  @computed
  get evaluatedProps() {
    return this.expressionEvaluationContext.props
  }

  @computed
  get expressionEvaluationContext(): IEvaluationContext {
    const componentProps = isRuntimeComponent(this.closestRuntimeContainerNode)
      ? this.closestRuntimeContainerNode.runtimeProps.componentEvaluatedProps
      : {}

    return this.addAndBind({
      actions: {},
      args: [],
      componentProps,
      // pass empty object because props can't evaluated by itself
      props: {},
      refs: this.runtimeStore.refs,
      rootActions: {},
      rootRefs: this.providerStore?.refs ?? {},
      rootState: this.providerStore?.state ?? {},
      state: this.runtimeStore.state,
      urlProps: this.urlProps ?? {},
    })
  }

  @computed
  get props() {
    // memorize values or else it will be lost inside callback
    const registerReference = isAtomRef(this.element.renderType)
    const slug = this.element.slug
    const store = this.runtimeStore
    const renderType = this.element.renderType.current
    // use "maybeCurrent" since in production websites api Interface might not be available
    const defaultProps = renderType.api.maybeCurrent?.defaultValues
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
  get providerStore() {
    return this.runtimeStore.runtimeProviderStore?.current
  }

  @computed
  get renderedChildrenProp(): ReactNode {
    const childrenProp = this.element.props.get('children')

    const isReactNodeType =
      childrenProp &&
      isTypedProp(childrenProp) &&
      childrenProp.kind === ITypeKind.ReactNodeType

    const Wrapper = isReactNodeType
      ? CodeMirrorEditorWrapper
      : RichTextEditorWrapper

    /**
     * If not rich text then it is react node then return it directly
     */
    return React.createElement(Wrapper, {
      runtimeElement: this.runtimeElement.current,
    })
  }

  /**
   * Applies all the type transformers to the props
   */
  @computed
  get renderedTypedProps() {
    return mapDeep(this.props, (value, key) => {
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

      return transformer.transform(
        value,
        key.toString(),
        this.runtimeElement.current,
      )
    })
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
  get runtimeStore() {
    return this.closestRuntimeContainerNode.runtimeStore
  }

  @computed
  get urlProps(): IPropData | undefined {
    if (isComponentRef(this.renderer.containerNode)) {
      return {}
    }

    return this.routerService.query
  }

  @modelAction
  getActionRunner(actionName: string) {
    return (
      this.expressionEvaluationContext.actions[actionName] ??
      this.expressionEvaluationContext.rootActions[actionName] ??
      (() => console.log(`No Runner found for ${actionName} `))
    )
  }

  addAndBind(context: IEvaluationContext) {
    context['actions'] = this.transformRuntimeActions(
      this.runtimeStore.runtimeActionsList,
      context,
    )

    if (this.providerStore) {
      // If a root action is called in a regular page, the `state` should be from the provider's page store
      context['state'] = context.rootState
      context['rootActions'] = this.transformRuntimeActions(
        this.providerStore.runtimeActionsList,
        context,
      )
    }

    context['props'] = this.evaluateProps(context)

    return context
  }

  evaluateProps(context: IEvaluationContext) {
    // Evaluate children prop only in preview and production modes
    if (
      this.renderer.rendererType === RendererType.Preview ||
      this.renderer.rendererType === RendererType.Production
    ) {
      return evaluateObject(this.renderedTypedProps, context)
    }

    const evaluated = evaluateObject(this.renderedTypedProps, context)

    return evaluated
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

  @computed
  private get rendererService() {
    return getRendererService(this)
  }

  @computed
  private get routerService() {
    return getRouterService(this)
  }
}
