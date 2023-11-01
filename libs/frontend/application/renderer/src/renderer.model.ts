import type {
  ElementWrapperProps,
  IRendererDto,
  IRendererModel,
  IRenderOutput,
  IRenderPipe,
  IRuntimeComponent,
  IRuntimeElement,
  IRuntimeStore,
  ITypedPropTransformer,
  RendererType,
} from '@codelab/frontend/abstract/application'
import type {
  IActionModel,
  IElementTree,
  IExpressionTransformer,
  IPageModel,
  IPageNode,
} from '@codelab/frontend/abstract/domain'
import {
  componentRef,
  elementRef,
  elementTreeRef,
  IComponentModel,
  IElementModel,
  IPageNodeRef,
  isElementRef,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import {
  evaluateExpression,
  hasStateExpression,
} from '@codelab/frontend/application/shared/core'
import type { IPropData, IRef } from '@codelab/shared/abstract/core'
import { IPageKind } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { throwIfUndefined } from '@codelab/shared/utils'
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
import { RuntimeComponent } from './runtime-component.model'
import { RuntimeElement } from './runtime-element.model'
import { RuntimeStore } from './runtime-store.model'
import { typedPropTransformersFactory } from './typedPropTransformers'
import { getRunner } from './utils'
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
    runtimeComponents: prop<ObjectMap<IRuntimeComponent>>(() => objectMap([])),
    runtimeElements: prop<ObjectMap<IRuntimeElement>>(() => objectMap([])),
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
  addRuntimeComponent(component: IComponentModel) {
    const existingRuntimeComponent = this.runtimeComponents.get(component.id)

    if (existingRuntimeComponent) {
      return existingRuntimeComponent
    }

    const runtimeComponent = RuntimeComponent.create({
      nodeRef: componentRef(component),
    })

    this.runtimeComponents.set(component.id, runtimeComponent)

    return runtimeComponent
  }

  @modelAction
  addRuntimeElement(element: IElementModel) {
    const existingRuntimeElement = this.runtimeElements.get(element.id)

    if (existingRuntimeElement) {
      return existingRuntimeElement
    }

    const runtimeElement = RuntimeElement.create({
      nodeRef: elementRef(element),
    })

    this.runtimeElements.set(element.id, runtimeElement)

    return runtimeElement
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
      console.dir({ element: rendered.element, rendered })
    }
  }

  /**
   * Renders a single element (without its children) to an intermediate RenderOutput
   */
  renderIntermediateElement = (element: IElementModel): IRenderOutput => {
    this.addRuntimeStore(element.store.current)

    const runtimeProps = this.addRuntimeElement(element)

    console.log('IntermediateElement', runtimeProps.evaluatedProps)

    return this.renderPipe.render(element, runtimeProps.evaluatedProps)
  }

  runPostRenderAction = (element: IElementModel) => {
    const { postRenderAction } = element
    const currentPostRenderAction = postRenderAction?.current

    if (currentPostRenderAction) {
      const runtimeAction = this.runtimeAction(currentPostRenderAction)

      const runner = runtimeAction.runner.bind(
        this.runtimeElements.get(element.id)?.expressionEvaluationContext,
      )

      runner(element)
    }
  }

  runPreRenderAction = (element: IElementModel) => {
    const { preRenderAction, providerStore, store } = element

    if (preRenderAction) {
      const { runner: preRenderActionRunner } = getRunner(
        this,
        preRenderAction.id,
        store.id,
        providerStore?.id,
      )

      if (preRenderActionRunner) {
        const runner = preRenderActionRunner.runner.bind(
          this.runtimeElements.get(element.id)?.expressionEvaluationContext,
        )

        runner(element)
      }
    }
  }

  /**
   * Renders a single Element using the provided RenderAdapter
   */
  renderElement = (element: IElementModel): Nullable<ReactElement> => {
    // Render the element to an intermediate output
    const renderOutput = this.renderIntermediateElement(element)

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
        this.runPostRenderAction(element)
      },
      renderer: this,
      renderOutput,
    }

    return React.createElement(ElementWrapper, wrapperProps)
  }

  runtimeElement(element: IRef) {
    return throwIfUndefined(this.runtimeElements.get(element.id))
  }

  runtimeComponent(component: IRef) {
    return throwIfUndefined(this.runtimeComponents.get(component.id))
  }

  runtimeStore(store: IRef) {
    return throwIfUndefined(this.runtimeStores.get(store.id))
  }

  runtimeAction(actionRef: IRef) {
    const actions = [...this.runtimeStores.values()].flatMap(
      (store) => store.runtimeActions,
    )

    return throwIfUndefined(
      actions.find((action) => (action.id = actionRef.id)),
    )
  }

  shouldRenderElement(runtimeElement: IRuntimeElement) {
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
