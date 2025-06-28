import type {
  IRuntimeActionModel,
  IRuntimeContext,
  IRuntimeElementModel,
  IRuntimeElementPropDto,
  IRuntimeElementPropModel,
} from '@codelab/frontend-abstract-application'
import type { Ref } from 'mobx-keystone'
import type { ReactNode } from 'react'

import {
  getRendererService,
  getRouterService,
  isRuntimeComponent,
} from '@codelab/frontend-abstract-application'
import {
  DATA_ELEMENT_ID,
  DATA_RUNTIME_ELEMENT_KEY,
  isAtom,
  isAtomRef,
  isComponentRef,
  isTypedProp,
} from '@codelab/frontend-abstract-domain'
import { mergeProps } from '@codelab/frontend-domain-prop/utils'
import { type IPropData, ITypeKind } from '@codelab/shared-abstract-core'
import {
  evaluateExpression,
  evaluateObject,
  hasExpression,
} from '@codelab/shared-infra-eval'
import { mapDeep } from '@codelab/shared-utils'
import { computed, observable, set } from 'mobx'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'
import { createElement } from 'react'
import { mergeDeep, pathOr, stringToPath } from 'remeda'

import { CodeMirrorEditorWrapper, RichTextEditorWrapper } from '../components'

const create = (dto: IRuntimeElementPropDto) =>
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
    return this.runtimeElement.current.closestContainerNode
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
      stringToPath(this.element.childMapperPropKey),
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
      [DATA_RUNTIME_ELEMENT_KEY]: this.runtimeElement.current.compositeKey,
      key: this.runtimeElement.current.compositeKey,
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

    const runtimeElement = this.runtimeElement.current
    const { evaluatedProps } = runtimeElement.runtimeProps
    const evaluatedChildrenProp = evaluatedProps['children']
    const childrenProp = this.element.props.get('children')

    // Some of the atoms, like AntDesignFormList, require children to be a function.
    // If the evaluated children value is of type function - stop processing and use it as-is.
    if (typeof evaluatedChildrenProp === 'function') {
      return evaluatedChildrenProp
    }

    const isCodeMirrorType =
      childrenProp &&
      isTypedProp(childrenProp) &&
      childrenProp.kind === ITypeKind.CodeMirrorType

    const isRichTextType =
      childrenProp &&
      isTypedProp(childrenProp) &&
      childrenProp.kind === ITypeKind.RichTextType

    if (!isCodeMirrorType && !isRichTextType) {
      return null
    }

    const Wrapper = isCodeMirrorType
      ? CodeMirrorEditorWrapper
      : RichTextEditorWrapper

    return createElement(Wrapper, {
      runtimeElement: this.runtimeElement.current,
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

    return this.routerService.searchParams
  }

  renderedTypedProps: IPropData = observable.object<IPropData>(
    {},
    {},
    // do not observe the nested data, this will wrap properties in proxis,
    // and when passing to React.createElement it will case script errors
    { deep: false },
  )

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

  /**
   * Applies all the type transformers to the props
   */
  @modelAction
  renderTypedProps() {
    const renderedProps = mapDeep(this.props, (value, key) => {
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

    set(this.renderedTypedProps, renderedProps)
  }

  private transformRuntimeActions(
    runtimeActions: Array<IRuntimeActionModel>,
    context: IRuntimeContext,
  ): IPropData {
    return runtimeActions
      .map((runtimeAction) => ({
        [runtimeAction.action.current.name]: runtimeAction.runner.bind(context),
      }))
      .reduce((acc, cur) => mergeDeep(acc, cur), {} as IPropData)
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
