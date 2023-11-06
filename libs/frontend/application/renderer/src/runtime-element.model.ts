import type {
  ElementWrapperProps,
  IRuntimeElementDTO,
  IRuntimeElementModel,
  IRuntimeModel,
  IRuntimeModelRef,
  IRuntimeStoreModel,
} from '@codelab/frontend/abstract/application'
import {
  getRendererService,
  IEvaluationContext,
  isRuntimeElementRef,
  RendererType,
} from '@codelab/frontend/abstract/application'
import type { IElementModel } from '@codelab/frontend/abstract/domain'
import {
  CUSTOM_TEXT_PROP_KEY,
  DATA_ELEMENT_ID,
  isAtom,
  isAtomRef,
  isTypedProp,
} from '@codelab/frontend/abstract/domain'
import {
  evaluateExpression,
  evaluateObject,
  hasStateExpression,
} from '@codelab/frontend/application/shared/core'
import { getDefaultFieldProps } from '@codelab/frontend/domain/prop'
import { IPageKind, type IPropData } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { Maybe } from '@codelab/shared/abstract/types'
import { mapDeep } from '@codelab/shared/utils'
import compact from 'lodash/compact'
import get from 'lodash/get'
import omit from 'lodash/omit'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'
import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import type { ArrayOrSingle } from 'ts-essentials'
import { ElementWrapper } from './element/element-wrapper'
import { createTextEditor, createTextRenderer } from './element/wrapper.utils'

const create = ({ elementRef, parentRef }: IRuntimeElementDTO) => {
  return new RuntimeElement({ elementRef, parentRef })
}

@model('@codelab/RuntimeElement')
export class RuntimeElement
  extends Model({
    elementRef: prop<Ref<IElementModel>>(),
    id: idProp,
    parentRef: prop<IRuntimeModelRef>(),
  })
  implements IRuntimeElementModel
{
  static create = create

  @computed
  get element() {
    return this.elementRef.current
  }

  @computed
  get parent() {
    return this.parentRef.current
  }

  @computed
  get closestRuntimeContainerNode() {
    if (isRuntimeElementRef(this.parentRef)) {
      return this.parentRef.current.closestRuntimeContainerNode
    }

    return this.parentRef.current
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
    return {
      actions: this.runtimeStore.runtimeActions,
      componentProps: this.closestRuntimeContainerNode.evaluatedProps,
      // pass empty object because props can't evaluated by itself
      props: {},
      refs: this.runtimeStore.refs,
      rootActions: this.providerStore?.runtimeActions ?? {},
      rootRefs: this.providerStore?.refs || {},
      rootState: this.providerStore?.state || {},
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

  render(): Nullable<ReactElement> {
    // Render the element to an intermediate output
    const renderOutput = this.renderer.renderPipe.render(this)

    if (renderOutput.shouldRender === false) {
      return null
    }

    const wrapperProps: ElementWrapperProps = {
      errorBoundary: {
        onError: ({ message, stack }) => {
          this.element.setRenderingError({ message, stack })
        },
        onResetKeysChange: () => {
          this.element.setRenderingError(null)
        },
      },
      key: this.element.id,
      onRendered: () => {
        this.renderer.runPostRenderAction(renderOutput.runtimeElement)
      },
      renderer: this.renderer,
      renderOutput,
      runtimeElement: this,
    }

    return React.createElement(ElementWrapper, wrapperProps)
  }

  @modelAction
  addChildMapperRuntimeComponents() {
    const { childMapperComponent } = this.element

    if (!childMapperComponent) {
      return []
    }

    return this.evaluatedChildMapperProp.map((propValue, i) => {
      const runtimeChildMapperComponent = this.renderer.addRuntimeContainerNode(
        childMapperComponent.current,
        this,
      )

      // TODO: set props here

      return runtimeChildMapperComponent
    })
  }

  @modelAction
  addComponentInstanceChildren() {
    const parentComponent = this.element.parentComponent?.current

    const isContainer =
      this.element.id === parentComponent?.childrenContainerElement.id

    if (!isContainer || !parentComponent.instanceElement?.current) {
      return []
    }

    return parentComponent.instanceElement.current.children.map((child) => {
      return this.closestRuntimeContainerNode.addRuntimeElement(child)
    })
  }

  addChildPageRuntimeContainerNode() {
    const providerTreeRoot =
      this.renderer.providerTree?.current.rootElement.current

    const providerPage = providerTreeRoot?.page?.current
    const pageContentContainer = providerPage?.pageContentContainer?.current
    const pageRoot = this.renderer.elementTree.current.rootElement.current
    const pageKind = pageRoot.page?.current.kind

    // 1. check if this is the element in _app page where child page needs to be rendered
    // 2. do not self-wrap _app page, and do not wrap 404 and 500
    if (
      pageRoot.page?.current &&
      pageContentContainer?.id === this.element.id &&
      pageKind === IPageKind.Regular
    ) {
      return [this.renderer.addRuntimeContainerNode(pageRoot.page.current)]
    }

    return []
  }

  /**
   * Renders the elements children
   */
  @modelAction
  renderChildren = (): ArrayOrSingle<ReactNode> => {
    const childMapperRuntimeComponent = this.addChildMapperRuntimeComponents()

    const childMapperRenderIndex =
      this.element.children.findIndex(
        (child) => child.id === this.element.childMapperPreviousSibling?.id,
      ) + 1

    const elementChildren: Array<IRuntimeModel> = [
      ...this.element.children,
    ].map((child) => this.closestRuntimeContainerNode.addRuntimeElement(child))

    elementChildren.splice(
      childMapperRenderIndex,
      0,
      ...childMapperRuntimeComponent,
    )

    const componentInstanceChildren = this.addComponentInstanceChildren()
    const childPageChildren = this.addChildPageRuntimeContainerNode()

    const children = [
      ...elementChildren,
      ...componentInstanceChildren,
      ...childPageChildren,
    ]

    const renderedChildren = compact(children.map((child) => child.render()))
    const hasChildren = renderedChildren.length > 0

    if (!hasChildren) {
      // Inject text, but only if we have no regular children
      const injectedText = this.evaluatedProps[CUSTOM_TEXT_PROP_KEY] || '""'

      const shouldInjectText =
        isAtom(this.element.renderType.current) &&
        this.element.renderType.current.allowCustomTextInjection

      if (shouldInjectText) {
        const readOnly = !this.element.isTextContentEditable

        return this.renderer.rendererType === RendererType.Preview ||
          this.renderer.rendererType === RendererType.Production
          ? createTextRenderer(injectedText)
          : createTextEditor(injectedText, this.element.id, readOnly)
      }

      /*
       * It's important to be undefined if we have no children to display,
       * since void components like input will throw an error if their children prop isn't undefined
       */
      return undefined
    }

    /*
     * If we have only one child, just return it.
     * Ant Design doesn't handle array children well in some cases, like Forms
     */
    if (Array.isArray(children) && children.length === 1) {
      return renderedChildren[0]
    }

    return renderedChildren
  }
}
