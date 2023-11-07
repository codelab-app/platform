import type {
  ElementWrapperProps,
  IRuntimeElementDTO,
  IRuntimeElementModel,
  IRuntimeModel,
  IRuntimeModelRef,
  IRuntimePropModel,
} from '@codelab/frontend/abstract/application'
import {
  getRendererService,
  isRuntimeElementRef,
  RendererType,
  runtimeElementRef,
} from '@codelab/frontend/abstract/application'
import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import {
  CUSTOM_TEXT_PROP_KEY,
  elementRef,
  IElementModel,
  isAtom,
  isComponent,
  isPage,
} from '@codelab/frontend/abstract/domain'
import {
  evaluateExpression,
  hasStateExpression,
} from '@codelab/frontend/application/shared/core'
import { Nullable } from '@codelab/shared/abstract/types'
import compact from 'lodash/compact'
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
import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import { ArrayOrSingle } from 'ts-essentials'
import { v4 } from 'uuid'
import { ElementWrapper } from './element/element-wrapper'
import { createTextEditor, createTextRenderer } from './element/wrapper.utils'
import { RuntimeContainerNodeFactory } from './runtime-container-node.factory'
import { RuntimeElementProps } from './runtime-element-prop.model'

const create = (runtimeElementDTO: IRuntimeElementDTO) => {
  return new RuntimeElement({
    elementRef: runtimeElementDTO.elementRef,
    id: runtimeElementDTO.id,
    parentRef: runtimeElementDTO.parentRef,
    runtimeProps: runtimeElementDTO.runtimeProps,
  })
}

@model('@codelab/RuntimeElement')
export class RuntimeElement
  extends Model({
    elementRef: prop<Ref<IElementModel>>(),
    id: idProp,
    parentRef: prop<IRuntimeModelRef>(),
    runtimeChildren: prop<ObjectMap<IRuntimeModel>>(() => objectMap([])),
    runtimeProps: prop<IRuntimePropModel>(),
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
  get renderer() {
    const activeRenderer = getRendererService(this).activeRenderer?.current

    if (!activeRenderer) {
      throw new Error('No active Renderer was found')
    }

    return activeRenderer
  }

  @computed
  get shouldRender() {
    const { renderIfExpression } = this.element

    if (!renderIfExpression || !hasStateExpression(renderIfExpression)) {
      return true
    }

    return evaluateExpression(
      renderIfExpression,
      this.runtimeProps.expressionEvaluationContext,
    )
  }

  @computed
  get isPageContentContainer() {
    const providerPage = this.renderer.providerPage
    const containerElement = providerPage?.pageContentContainer?.current

    return this.element.id === containerElement?.id
  }

  @computed
  get isComponentInstanceChildrenContainer() {
    const { containerNode } = this.closestRuntimeContainerNode

    return (
      !isPage(containerNode) &&
      this.element.id === containerNode.childrenContainerElement.id
    )
  }

  @computed
  get render(): Nullable<ReactElement> {
    // reset state from last render
    this.runtimeChildren.clear()

    if (this.shouldRender === false) {
      return null
    }

    // Render the element to an intermediate output
    const renderOutput = this.renderer.renderPipe.render(this)

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

  /**
   * Adds RuntimeContainerNode to runtime children
   * @param child
   * @returns RuntimeContainerNode
   */
  @modelAction
  addRuntimeContainerNode(child: IComponentModel | IPageModel) {
    const runtimeContainerNode = RuntimeContainerNodeFactory.create({
      containerNode: child,
      parent: this,
      runtimeProviderStore: isPage(child) ? this.runtimeStore : undefined,
    })

    this.runtimeChildren.set(runtimeContainerNode.id, runtimeContainerNode)

    return runtimeContainerNode
  }

  /**
   * Adds a runtime element to runtime children
   * @param child
   * @returns RuntimeElement
   */
  @modelAction
  addRuntimeElement(child: IElementModel) {
    const runtimeChildElementId = v4()

    const runtimeProps = RuntimeElementProps.create({
      elementRef: elementRef(child.id),
      runtimeElementRef: runtimeElementRef(runtimeChildElementId),
    })

    const runtimeChildElement = RuntimeElement.create({
      elementRef: elementRef(child.id),
      id: runtimeChildElementId,
      parentRef: runtimeElementRef(this.id),
      runtimeProps,
    })

    this.runtimeChildren.set(child.id, runtimeChildElement)

    return runtimeChildElement
  }

  @modelAction
  addRuntimeChild(child: IComponentModel | IElementModel | IPageModel) {
    const existingRuntimeChild = this.runtimeChildren.get(child.id)

    if (existingRuntimeChild) {
      return existingRuntimeChild
    }

    return isPage(child) || isComponent(child)
      ? this.addRuntimeContainerNode(child)
      : this.addRuntimeElement(child)
  }

  /**
   * Renders the elements children
   */
  @computed
  get renderChildren(): ArrayOrSingle<ReactNode> {
    /*     
    const childMapperRenderIndex =
      this.element.children.findIndex(
        (child) => child.id === this.element.childMapperPreviousSibling?.id,
    ) + 1

    const elementChildren: Array<IRuntimeModel> = [
      ...this.element.children,
    ].map((child) => this.addRuntimeChild(child))

    elementChildren.splice(
      childMapperRenderIndex,
      0,
      ...this.childMapperRuntimeComponents,
    )

    const children = [
      ...elementChildren,
    ]

    const renderedChildren = compact(children.map((child) => child.render))
    const hasChildren = renderedChildren.length > 0 */
    const runtimeChildren = [...this.runtimeChildren.values()]

    const renderedChildren = compact(
      runtimeChildren.map((child) => child.render),
    )

    const hasNoChildren = runtimeChildren.length === 0
    const hasOneChild = runtimeChildren.length === 1

    if (hasNoChildren) {
      // Inject text, but only if we have no regular children
      const injectedText =
        this.runtimeProps.evaluatedProps[CUSTOM_TEXT_PROP_KEY] || '""'

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
    if (hasOneChild) {
      return renderedChildren[0]
    }

    return renderedChildren
  }
}
