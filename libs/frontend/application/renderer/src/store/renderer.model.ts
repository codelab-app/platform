import type {
  IRendererDto,
  IRendererModel,
  IRenderPipe,
  IRuntimeComponentModel,
  IRuntimePageModel,
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
  runtimeComponentRef,
  runtimePageRef,
} from '@codelab/frontend/abstract/application'
import {
  componentRef,
  isPage,
  pageRef,
} from '@codelab/frontend/abstract/domain'
import { Validator } from '@codelab/shared/infra/typebox'
import { computed } from 'mobx'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

import { defaultPipes, renderPipeFactory } from '../render-pipes'
import { typedPropTransformersFactory } from '../typed-prop-transformers'

const compositeKey = (
  page: IComponentModel | IPageModel,
  rendererType: RendererType,
) => `${page.id}-${rendererType}`

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
  containerNode,
  id,
  rendererType,
  runtimeRootContainerNode,
}: IRendererDto) => {
  return new RendererModel({
    containerNode: isPage(containerNode)
      ? pageRef(containerNode)
      : componentRef(containerNode),
    id,

    rendererType,
    /**
     * Renderer uses an ID based on container node, but can't be the same, so we prefix it with the renderer type
     *
     * Our renderer ref prefixes it
     */
    runtimeRootContainerNode: isRuntimePage(runtimeRootContainerNode)
      ? runtimePageRef(runtimeRootContainerNode)
      : runtimeComponentRef(runtimeRootContainerNode),
  })
}

@model('@codelab/Renderer')
export class RendererModel
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

    runtimeRootContainerNode: prop<
      Ref<IRuntimeComponentModel> | Ref<IRuntimePageModel>
    >(),
    /**
     * Those transform different kinds of typed values into render-ready props
     */
    typedPropTransformers: prop<ObjectMap<ITypedPropTransformer>>(() =>
      typedPropTransformersFactory(),
    ),
  })
  implements IRendererModel
{
  static compositeKey = compositeKey

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
  get rendered() {
    return this.runtimeRootContainerNode.current.rendered ?? null
  }

  @computed
  get runtimeComponent() {
    return isRuntimeComponent(this.runtimeRootContainerNode.current)
      ? this.runtimeRootContainerNode.current
      : undefined
  }

  @computed
  get runtimeComponentService() {
    return getRuntimeComponentService(this)
  }

  @computed
  get runtimeContainerNode() {
    const node =
      this.runtimePage?.childPage?.current ??
      this.runtimePage ??
      this.runtimeComponent

    Validator.assertsDefined(node)

    return node
  }

  @computed
  get runtimePage() {
    return isRuntimePage(this.runtimeRootContainerNode.current)
      ? this.runtimeRootContainerNode.current
      : undefined
  }

  @computed
  get runtimePageService() {
    return getRuntimePageService(this)
  }

  @modelAction
  render() {
    this.runtimeRootContainerNode.current.render()
  }
}
