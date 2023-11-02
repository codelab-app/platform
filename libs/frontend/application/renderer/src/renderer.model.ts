import type {
  ElementWrapperProps,
  IRendererDto,
  IRendererModel,
  IRenderOutput,
  IRenderPipe,
  IRuntimeContainerNodeModel,
  IRuntimeElementModel,
  ITypedPropTransformer,
  RendererType,
} from '@codelab/frontend/abstract/application'
import { IRuntimeContainerNodeDTO } from '@codelab/frontend/abstract/application'
import type {
  IElementModel,
  IElementTree,
  IExpressionTransformer,
} from '@codelab/frontend/abstract/domain'
import { elementTreeRef } from '@codelab/frontend/abstract/domain'
import {
  evaluateExpression,
  hasStateExpression,
} from '@codelab/frontend/application/shared/core'
import { IPageKind } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import isObject from 'lodash/isObject'
import type { ObjectMap, Ref } from 'mobx-keystone'
import {
  idProp,
  Model,
  model,
  modelAction,
  objectMap,
  prop,
} from 'mobx-keystone'
import type { ReactElement } from 'react'
import React from 'react'
import { ElementWrapper } from './element/element-wrapper'
import { ExpressionTransformer } from './expression-transformer.service'
import { defaultPipes, renderPipeFactory } from './renderPipes'
import { RuntimeContainerNodeModel } from './runtime-container-node.model'
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
  providerTree,
  rendererType,
  urlSegments,
}: IRendererDto) => {
  return new Renderer({
    elementTree: elementTreeRef(elementTree),
    providerTree: providerTree ? elementTreeRef(providerTree) : null,
    rendererType,
    urlSegments,
  })
}

@model('@codelab/Renderer')
export class Renderer
  extends Model({
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
    runtimeContainerNodes: prop<ObjectMap<IRuntimeContainerNodeModel>>(() =>
      objectMap([]),
    ),
    // runtimeStores: prop<ObjectMap<IRuntimeStore>>(() => objectMap([])),
    /**
     * Those transform different kinds of typed values into render-ready props
     */
    typedPropTransformers: prop<ObjectMap<ITypedPropTransformer>>(() =>
      typedPropTransformersFactory(),
    ),
    urlSegments: prop<Record<string, string> | undefined>(),
  })
  implements IRendererModel
{
  static create = create

  @modelAction
  addRuntimeContainerNode(runtimeContainerNodeDTO: IRuntimeContainerNodeDTO) {
    const { containerNodeRef } = runtimeContainerNodeDTO

    const existingRuntimeContainerNode = this.runtimeContainerNodes.get(
      containerNodeRef.id,
    )

    if (existingRuntimeContainerNode) {
      return existingRuntimeContainerNode
    }

    const runtimeContainerNode = RuntimeContainerNodeModel.create(
      runtimeContainerNodeDTO,
    )

    this.runtimeContainerNodes.set(
      runtimeContainerNode.id,
      runtimeContainerNode,
    )

    return runtimeContainerNode
  }

  getChildMapperChildren(element: IElementModel) {
    const { childMapperComponent } = element

    if (!childMapperComponent) {
      return []
    }

    return (
      this.runtimeElements
        .get(element.id)
        ?.evaluatedChildMapperProp.map((propValue, i) => {
          const clonedComponent = childMapperComponent.current.clone(
            `${element.id}-${i}`,
          )

          const rootElement = clonedComponent.rootElement.current

          clonedComponent.props.setMany(
            isObject(propValue) ? propValue : { value: propValue },
          )

          if (!this.runtimeComponents.get(clonedComponent.id)) {
            this.addRuntimeComponent(clonedComponent)
          }

          return rootElement
        }) ?? []
    )
  }

  getChildPageChildren(element: IElementModel) {
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

  getComponentInstanceChildren(element: IElementModel) {
    const parentComponent = element.parentComponent?.current

    const isContainer =
      element.id === parentComponent?.childrenContainerElement.id

    if (!isContainer || !parentComponent.instanceElement?.current) {
      return []
    }

    return parentComponent.instanceElement.current.children
  }

  logRendered = (rendered: IRenderOutput) => {
    if (this.debugMode) {
      console.dir({ element: rendered.runtimeElement, rendered })
    }
  }

  /**
   * Renders a single element (without its children) to an intermediate RenderOutput
   */
  renderIntermediateElement = (
    element: IElementModel,
    runtimeContainerNode: IRuntimeContainerNodeModel,
  ): IRenderOutput => {
    const runtimeElement = runtimeContainerNode.addRuntimeElement(element)

    console.log('IntermediateElement', runtimeElement.evaluatedProps)

    return this.renderPipe.render(runtimeElement)
  }

  runPostRenderAction = (runtimeElement: IRuntimeElementModel) => {
    const { element } = runtimeElement
    const { postRenderAction } = element
    const currentPostRenderAction = postRenderAction?.current

    if (currentPostRenderAction) {
      const runtimeAction = runtimeElement.runtimeStore.runtimeAction(
        currentPostRenderAction,
      )

      runtimeAction?.runner(element)
    }
  }

  runPreRenderAction = (runtimeElement: IRuntimeElementModel) => {
    const { element } = runtimeElement
    const { preRenderAction } = element

    if (preRenderAction) {
      const runtimeAction =
        runtimeElement.runtimeStore.runtimeAction(preRenderAction)

      runtimeAction?.runner(element)
    }
  }

  /**
   * Renders a single Element using the provided RenderAdapter
   */
  renderElement = (
    element: IElementModel,
    runtimeContainerNode: IRuntimeContainerNodeModel,
  ): Nullable<ReactElement> => {
    // Render the element to an intermediate output
    const renderOutput = this.renderIntermediateElement(
      element,
      runtimeContainerNode,
    )

    if (renderOutput.shouldRender === false) {
      return null
    }

    const wrapperProps: ElementWrapperProps = {
      element,
      errorBoundary: {
        onError: ({ message, stack }) => {
          element.setRenderingError({ message, stack })
        },
        onResetKeysChange: () => {
          element.setRenderingError(null)
        },
      },
      key: element.id,
      onRendered: () => {
        this.runPostRenderAction(renderOutput.runtimeElement)
      },
      renderer: this,
      renderOutput,
    }

    return React.createElement(ElementWrapper, wrapperProps)
  }

  shouldRenderElement(runtimeElement: IRuntimeElementModel) {
    const { element } = runtimeElement

    if (
      !element.renderIfExpression ||
      !hasStateExpression(element.renderIfExpression)
    ) {
      return true
    }

    return evaluateExpression(
      element.renderIfExpression,
      runtimeElement.expressionEvaluationContext,
    )
  }
}
