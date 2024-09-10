import type {
  IRuntimeActionModel,
  IRuntimeElementModel,
  IRuntimeElementPropDTO,
  IRuntimeElementPropModel,
} from '@codelab/frontend/abstract/application'
import {
  getRendererService,
  getRouterService,
  IRuntimeContext,
  isRuntimeComponent,
} from '@codelab/frontend/abstract/application'
import {
  DATA_ELEMENT_ID,
  isAtom,
  isAtomRef,
  isComponentRef,
  isTypedProp,
} from '@codelab/frontend/abstract/domain'
import { mergeProps } from '@codelab/frontend-domain-prop/utils'
import { type IPropData, ITypeKind } from '@codelab/shared/abstract/core'
import {
  evaluateExpression,
  evaluateObject,
  hasExpression,
  mapDeep,
} from '@codelab/shared/utils'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'
import React, { createElement, ReactNode } from 'react'
import { merge, pathOr } from 'remeda'
import { CodeMirrorEditorWrapper, RichTextEditorWrapper } from '../components'

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
        this.runtimeContext,
      )

      if (!Array.isArray(evaluatedExpression)) {
        console.error('The evaluated childMapperPropKey is not an array')

        return []
      }

      return evaluatedExpression
    }

    const evaluatedChildMapperProps = pathOr(
      this.runtimeContext,
      [this.element.childMapperPropKey as keyof IRuntimeContext],
      {},
    )

    if (!Array.isArray(evaluatedChildMapperProps)) {
      console.error('The evaluated childMapperPropKey is not an array')

      return []
    }

    return evaluatedChildMapperProps
  }

  @computed
  get evaluatedProps() {
    return this.runtimeContext.props
  }

  @computed
  get evaluationContext() {
    const componentProps = isRuntimeComponent(this.closestRuntimeContainerNode)
      ? this.closestRuntimeContainerNode.runtimeProps.componentEvaluatedProps
      : {}

    const context: IRuntimeContext = {
      actions: {},
      args: [],
      componentProps,
      // pass props before evaluation
      props: {},
      refs: this.runtimeStore.refs,
      rootActions: {},
      rootRefs: this.providerStore?.refs ?? {},
      rootState: this.providerStore?.state ?? {},
      state: this.runtimeStore.state,
      urlProps: this.urlProps ?? {},
    }

    // initial bind creates a blueprint to pass evaluation
    // the real binding happens in runtime context
    context['actions'] = this.transformRuntimeActions(
      this.runtimeStore.runtimeActionsList,
      context,
    )

    // If a root action is called in a regular page, the `state` should be from the provider's page store
    context['rootActions'] = this.providerStore
      ? this.transformRuntimeActions(this.providerStore.runtimeActionsList, {
          ...context,
          state: context.rootState,
        })
      : {}

    return context
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
    const props = mergeProps(defaultProps ?? {}, this.element.props.values)

    return {
      ...props,
      /**
       * Internal system props for meta data, use double underline for system-defined identifiers.
       */
      [DATA_ELEMENT_ID]: this.element.id,
      key: this.element.id,
      ref: registerReference
        ? (node: HTMLElement) => {
            store.registerRef(slug, node)
          }
        : undefined,
    }
  }

  @computed
  get providerStore() {
    return this.runtimeStore.runtimeProviderStore?.current
  }

  @computed
  get renderedChildrenProp(): ReactNode {
    const atomApi = isAtom(this.element.renderType.current)
      ? this.element.renderType.current.api.current
      : undefined

    const childrenField = atomApi?.fields.find(
      (field) => field.key === 'children',
    )

    // atom doesn't allow children like input atom
    if (!childrenField) {
      return undefined
    }

    const childrenProp = this.element.props.get('children')

    const isCodeMirrorType =
      childrenProp &&
      isTypedProp(childrenProp) &&
      childrenProp.kind === ITypeKind.CodeMirrorType

    const Wrapper = isCodeMirrorType
      ? CodeMirrorEditorWrapper
      : RichTextEditorWrapper

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
  get runtimeContext(): IRuntimeContext {
    const context: IRuntimeContext = {
      ...this.evaluationContext,
      props: evaluateObject(this.renderedTypedProps, this.evaluationContext),
    }

    // bind again because context is updated with new values
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

    return context
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

    return this.routerService.queryParams
  }

  @modelAction
  getActionRunner(actionName: string) {
    return (
      this.runtimeContext.actions[actionName] ??
      this.runtimeContext.rootActions[actionName] ??
      (() => {
        console.log(`No Runner found for ${actionName} `)
      })
    )
  }

  private transformRuntimeActions(
    runtimeActions: Array<IRuntimeActionModel>,
    context: IRuntimeContext,
  ): IPropData {
    return runtimeActions
      .map((runtimeAction) => ({
        [runtimeAction.action.current.name]: runtimeAction.runner.bind(context),
      }))
      .reduce(merge, {} as IPropData)
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
