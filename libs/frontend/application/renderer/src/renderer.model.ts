import type {
  IRendererDto,
  IRendererModel,
  IRenderPipe,
  IRuntimeComponentModel,
  IRuntimePageModel,
  ITypedPropTransformer,
  RendererType,
} from '@codelab/frontend/abstract/application'
import { runtimeComponentRef } from '@codelab/frontend/abstract/application'
import type {
  IComponentModel,
  IExpressionTransformer,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import {
  componentRef,
  isPage,
  pageRef,
  storeRef,
} from '@codelab/frontend/abstract/domain'
import { computed } from 'mobx'
import type { ObjectMap, Ref } from 'mobx-keystone'
import { idProp, Model, model, prop } from 'mobx-keystone'
import { v4 } from 'uuid'
import { ExpressionTransformer } from './expression-transformer.service'
import { defaultPipes, renderPipeFactory } from './renderPipes'
import { RuntimeComponentModel } from './runtime-component.model'
import { RuntimeComponentPropModel } from './runtime-component-prop.model'
import { RuntimePageModel } from './runtime-page.model'
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

const create = ({ containerNode, rendererType, urlSegments }: IRendererDto) => {
  const runtimeContainerNodeId = v4()
  const providerPage = isPage(containerNode) && containerNode.providerPage

  const runtimeContainerNode = isPage(containerNode)
    ? RuntimePageModel.create({
        childPage: providerPage ? pageRef(containerNode) : undefined,
        id: runtimeContainerNodeId,
        page: pageRef(providerPage ? providerPage.id : containerNode.id),
        runtimeStore: RuntimeStoreModel.create({
          store: storeRef(
            providerPage ? providerPage.store.id : containerNode.store.id,
          ),
        }),
      })
    : RuntimeComponentModel.create({
        component: componentRef(containerNode),
        id: runtimeContainerNodeId,
        runtimeProps: RuntimeComponentPropModel.create({
          runtimeComponent: runtimeComponentRef(runtimeContainerNodeId),
        }),
        runtimeStore: RuntimeStoreModel.create({
          store: storeRef(containerNode.id),
        }),
      })

  return new Renderer({
    containerNode: isPage(containerNode)
      ? pageRef(containerNode)
      : componentRef(containerNode),
    rendererType,
    runtimeContainerNode,
    urlSegments,
  })
}

@model('@codelab/Renderer')
export class Renderer
  extends Model({
    /**
     * The tree that's being rendered, we assume that this is properly constructed
     */
    containerNode: prop<Ref<IComponentModel> | Ref<IPageModel>>(),

    /**
     * Will log the render output and render pipe info to the console
     */
    debugMode: prop(false).withSetter(),
    expressionTransformer: prop<IExpressionTransformer>(
      () => new ExpressionTransformer({}),
    ),
    id: idProp,
    /**
     * Different types of renderer requires behaviors in some cases.
     */
    rendererType: prop<RendererType>(),

    /**
     * The render pipe handles and augments the render process. This is a linked list / chain of render pipes
     */
    renderPipe: prop<IRenderPipe>(() => renderPipeFactory(defaultPipes)),
    /**
     * Runtime model for page/component when it is created first time
     */
    runtimeContainerNode: prop<IRuntimeComponentModel | IRuntimePageModel>(),
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

  /**
   * This is the entry point to start the rendering process
   */
  @computed
  get render() {
    return this.runtimeContainerNode.render
  }

  @computed
  get rootElement() {
    return this.containerNode.current.rootElement.current
  }
}
