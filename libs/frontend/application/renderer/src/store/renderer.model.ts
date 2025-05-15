import type {
  IRendererDto,
  IRendererModel,
  IRenderPipe,
  ITypedPropTransformer,
} from '@codelab/frontend/abstract/application'
import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { ObjectMap, Ref } from 'mobx-keystone'

import {
  getRuntimeComponentService,
  getRuntimePageService,
  isRuntimeComponent,
  isRuntimePage,
  RendererType,
} from '@codelab/frontend/abstract/application'
import {
  componentRef,
  isPage,
  pageRef,
} from '@codelab/frontend/abstract/domain'
import { computed } from 'mobx'
import { idProp, Model, model, prop } from 'mobx-keystone'

import { defaultPipes, renderPipeFactory } from '../render-pipes'
import { typedPropTransformersFactory } from '../typed-prop-transformers'

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

const create = ({ containerNode, id, rendererType }: IRendererDto) => {
  return new Renderer({
    containerNode: isPage(containerNode)
      ? pageRef(containerNode)
      : componentRef(containerNode),
    /**
     * Renderer uses an ID based on container node, but can't be the same, so we prefix it with the renderer type
     *
     * Our renderer ref prefixes it
     */
    id,
    rendererType,
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
     * Those transform different kinds of typed values into render-ready props
     */
    typedPropTransformers: prop<ObjectMap<ITypedPropTransformer>>(() =>
      typedPropTransformersFactory(),
    ),
  })
  implements IRendererModel
{
  static create = create

  @computed
  get isBuilder() {
    return (
      this.rendererType === RendererType.ComponentBuilder ||
      this.rendererType === RendererType.PageBuilder
    )
  }

  /**
   * This is the entry point to start the rendering process
   */
  @computed
  get render() {
    return this.runtimeRootContainerNode.render
  }

  @computed
  get runtimeComponent() {
    return isRuntimeComponent(this.runtimeRootContainerNode)
      ? this.runtimeRootContainerNode
      : undefined
  }

  @computed
  get runtimeComponentService() {
    return getRuntimeComponentService(this)
  }

  @computed
  get runtimeContainerNode() {
    return (
      this.runtimePage?.childPage?.current ??
      this.runtimePage ??
      this.runtimeComponent
    )
  }

  @computed
  get runtimePage() {
    return isRuntimePage(this.runtimeRootContainerNode)
      ? this.runtimeRootContainerNode
      : undefined
  }

  @computed
  get runtimePageService() {
    return getRuntimePageService(this)
  }

  @computed
  get runtimeRootContainerNode() {
    return isPage(this.containerNode.current)
      ? this.runtimePageService.add(this.containerNode.current)
      : this.runtimeComponentService.add(this.containerNode.current)
  }
}
