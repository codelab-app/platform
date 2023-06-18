import type {
  IActionRunner,
  IElement,
  IElementTree,
  IExpressionTransformer,
  IPageNode,
  IRenderer,
  IRenderOutput,
  IRenderPipe,
  IRuntimeProp,
  ITypedPropTransformer,
  RendererProps,
  RendererType,
} from '@codelab/frontend/abstract/core'
import {
  actionRef,
  CUSTOM_TEXT_PROP_KEY,
  elementRef,
  elementTreeRef,
  getRendererId,
  IPageNodeRef,
  isAtomInstance,
  isElementPageNodeRef,
} from '@codelab/frontend/abstract/core'
import { IPageKind } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import {
  idProp,
  Model,
  model,
  modelAction,
  objectMap,
  prop,
} from 'mobx-keystone'
import { createTransformer } from 'mobx-utils'
import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import type { ArrayOrSingle } from 'ts-essentials'
import { ActionRunner } from './action-runner.model'
import { ComponentRuntimeProps } from './component-runtime-props.model'
import type { ElementWrapperProps } from './element/element-wrapper'
import { ElementWrapper } from './element/element-wrapper'
import { makeCustomTextContainer } from './element/wrapper.utils'
import { ElementRuntimeProps } from './element-runtime-props.model'
import { ExpressionTransformer } from './expresssion-transformer.service'
import {
  defaultPipes,
  renderPipeFactory,
} from './renderPipes/render-pipe.factory'
import { typedPropTransformersFactory } from './typedPropTransformers'

/**
 * Handles the logic of rendering treeElements. Takes in an optional appTree
 *
 * NB! call .init() and wait for it to finish before using .render()
 *
 * Calling .render() renders a single Element (without it's children)
 * This ensures that each render() call can be used for a single isolated observer() - wrapped React Element
 * and it will get re-rendered only if the source Element model is changed
 *
 * The renderPipe and typedPropTransformers replace the previous render pipeline.
 * It's useful to keep them as mobx-keystone models because they can access the context of the state tree
 * which in practice can act as a DI container, so we can get outside data in the render pipeline easily.
 *
 * For example - we use the renderContext from ./renderContext inside the pipes to get the renderer model itself and its tree.
 */

const create = ({
  elementTree,
  id,
  providerTree,
  rendererType,
}: RendererProps) => {
  return new Renderer({
    elementTree: elementTreeRef(elementTree),
    // for refs to resolve we can't use pageId/componentId alone
    // it will resolve page/component instead
    id: getRendererId(id),
    providerTree: providerTree ? elementTreeRef(providerTree) : null,
    rendererType,
  })
}

@model('@codelab/Renderer')
export class Renderer
  extends Model({
    actionRunners: prop<ObjectMap<IActionRunner>>(() => objectMap([])),
    /**
     * Will log the render output and render pipe info to the console
     */
    debugMode: prop(false).withSetter(),
    /**
     * The tree that's being rendered, we assume that this is properly constructed
     */
    elementTree: prop<Ref<IElementTree>>(),
    expressionTransformer: prop<IExpressionTransformer>(
      () => new ExpressionTransformer({}),
    ),
    id: idProp,
    /**
     * Store attached to app, needed to access its actions
     */
    providerTree: prop<Nullable<Ref<IElementTree>>>(null),
    /**
     * Different types of renderer requires behaviors in some cases.
     */
    rendererType: prop<RendererType>(),
    /**
     * The render pipe handles and augments the render process. This is a linked list / chain of render pipes
     */
    renderPipe: prop<IRenderPipe>(() => renderPipeFactory(defaultPipes)),
    /**
     * Props record for all components during all transformations stages
     */
    runtimeProps: prop<ObjectMap<IRuntimeProp<IPageNode>>>(() => objectMap([])),
    /**
     * Those transform different kinds of typed values into render-ready props
     */
    typedPropTransformers: prop<ObjectMap<ITypedPropTransformer>>(() =>
      typedPropTransformersFactory(),
    ),
  })
  implements IRenderer
{
  renderRoot() {
    const root = this.elementTree.maybeCurrent?.rootElement.current
    const providerRoot = this.providerTree?.current.rootElement.current

    if (!root) {
      console.warn('Renderer: No root element found')

      return null
    }

    return providerRoot && root.page?.current.kind === IPageKind.Regular
      ? this.renderElement(providerRoot)
      : this.renderElement(root)
  }

  @modelAction
  addRuntimeProps(nodeRef: IPageNodeRef) {
    const runtimeProps = isElementPageNodeRef(nodeRef)
      ? ElementRuntimeProps.create(nodeRef)
      : ComponentRuntimeProps.create(nodeRef)

    this.runtimeProps.set(nodeRef.id, runtimeProps)

    return runtimeProps
  }

  /**
   * Renders a single Element using the provided RenderAdapter
   */
  renderElement = (element: IElement): ReactElement => {
    const wrapperProps: ElementWrapperProps & { key: string } = {
      element,
      key: `element-wrapper-${element.id}`,
      renderer: this,
    }

    return React.createElement(ElementWrapper, wrapperProps)
  }

  /**
   * Renders a single element (without its children) to an intermediate RenderOutput
   *
   */
  renderIntermediateElement = (
    element: IElement,
  ): ArrayOrSingle<IRenderOutput> => {
    const runtimeProps = this.addRuntimeProps(elementRef(element.id))

    if (element.isRoot) {
      element.store.current.actions.forEach((action) => {
        const componentProps =
          element.parentComponent?.current.runtimeProp
            ?.componentEvaluatedProps || {}

        const runner = ActionRunner.create(actionRef(action.id), componentProps)
        this.actionRunners.set(action.id, runner)
      })
    }

    return this.renderPipe.render(element, runtimeProps.evaluatedProps)
  }

  getComponentInstanceChildren(element: IElement) {
    const parentComponent = element.parentComponent?.current

    const isContainer =
      element.id === parentComponent?.childrenContainerElement.id

    if (!isContainer || !parentComponent.instanceElement?.current) {
      return []
    }

    return parentComponent.instanceElement.current.children
  }

  getChildPageChildren(element: IElement) {
    const providerTreeRoot = this.providerTree?.current.rootElement.current
    const providerPage = providerTreeRoot?.page?.current
    const pageContentContainer = providerPage?.pageContentContainer?.current
    const pageRoot = this.elementTree.current.rootElement.current
    const pageKind = pageRoot.page?.current.kind

    // 1. check if this is the element in _app page where child page needs to be rendered
    // 2. do not self-wrap _app page, and do not wrap 404 and 500
    if (
      pageContentContainer?.id === element.id &&
      pageKind === IPageKind.Regular
    ) {
      return [this.elementTree.current.rootElement.current]
    }

    return []
  }

  /**
   * Renders the elements children, createTransformer memoizes the function
   */
  renderChildren = createTransformer(
    (parentOutput: IRenderOutput): ArrayOrSingle<ReactNode> => {
      const children = [
        ...parentOutput.element.children,
        ...this.getComponentInstanceChildren(parentOutput.element),
        ...this.getChildPageChildren(parentOutput.element),
      ]

      const renderedChildren = children.map((child) =>
        this.renderElement(child),
      )

      const hasChildren = renderedChildren.length > 0

      if (!hasChildren) {
        // Inject text, but only if we have no regular children
        const injectedText = parentOutput.props?.[CUSTOM_TEXT_PROP_KEY]

        const shouldInjectText =
          isAtomInstance(parentOutput.element.renderType) &&
          parentOutput.element.renderType.current.allowCustomTextInjection

        if (shouldInjectText && injectedText) {
          return makeCustomTextContainer(injectedText)
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
    },
  )

  logRendered = (element: IElement, rendered: ArrayOrSingle<IRenderOutput>) => {
    if (this.debugMode) {
      console.dir({ element: element, rendered })
    }
  }

  static create = create
}
