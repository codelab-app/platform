import type {
  IRendererDto,
  IRendererModel,
  IRenderOutput,
  IRenderPipe,
  IRuntimeContainerNodeModel,
  IRuntimeElementModel,
  ITypedPropTransformer,
  RendererType,
} from '@codelab/frontend/abstract/application'
import {
  IRuntimeModel,
  isRuntimeContainerNode,
  runtimeModelRef,
  runtimeStoreRef,
} from '@codelab/frontend/abstract/application'
import type {
  IComponentModel,
  IElementTree,
  IExpressionTransformer,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import {
  actionRef,
  componentRef,
  elementTreeRef,
  isPage,
  pageRef,
  storeRef,
} from '@codelab/frontend/abstract/domain'
import {
  evaluateExpression,
  hasStateExpression,
} from '@codelab/frontend/application/shared/core'
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
import { ExpressionTransformer } from './expression-transformer.service'
import { defaultPipes, renderPipeFactory } from './renderPipes'
import { RuntimeActionModel } from './runtime-action.model'
import { RuntimeContainerNodeModel } from './runtime-container-node.model'
import { RuntimeStoreModel } from './runtime-store.model'
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
  addRuntimeContainerNode(
    containerNode: IComponentModel | IPageModel,
    parent?: IRuntimeModel,
  ) {
    const existingRuntimeContainerNode = this.runtimeContainerNodes.get(
      containerNode.id,
    )

    if (existingRuntimeContainerNode) {
      return existingRuntimeContainerNode
    }

    const actions = containerNode.store.current.actions

    const isParentContainerNodeProviderPage =
      parent &&
      isRuntimeContainerNode(parent) &&
      isPage(parent.containerNode) &&
      parent.containerNode.kind === IPageKind.Provider

    const runtimeStore = RuntimeStoreModel.create({
      runtimeProviderStoreRef: isParentContainerNodeProviderPage
        ? runtimeStoreRef(parent.runtimeStore.id)
        : undefined,
      storeRef: storeRef(containerNode.store.current),
    })

    const runtimeActions = actions.map((action) =>
      RuntimeActionModel.create({
        actionRef: actionRef(action.id),
        runtimeStoreRef: runtimeStoreRef(runtimeStore.id),
      }),
    )

    runtimeActions.forEach((runtimeAction) => {
      runtimeStore.runtimeActions.set(runtimeAction.id, runtimeAction)
    })

    const runtimeContainerNode = RuntimeContainerNodeModel.create({
      containerNodeRef: isPage(containerNode)
        ? pageRef(containerNode.id)
        : componentRef(containerNode.id),
      parentRef: parent ? runtimeModelRef(parent) : undefined,
      runtimeStore,
    })

    this.runtimeContainerNodes.set(
      runtimeContainerNode.id,
      runtimeContainerNode,
    )

    return runtimeContainerNode
  }

  logRendered = (rendered: IRenderOutput) => {
    if (this.debugMode) {
      console.dir({ element: rendered.runtimeElement, rendered })
    }
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
